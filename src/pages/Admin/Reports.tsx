import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export const ReportsPage = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // KPI states
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const resTx = await fetch("/transactions/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const txData: Transaction[] = await resTx.json();

        setTransactions(txData);
        const resUsers = await fetch("/admin/users/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resAccounts = await fetch("/admin/accounts/count", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalUsers(await resUsers.json());
        setTotalAccounts(await resAccounts.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  // ------------------------------
  // DAILY TRANSACTIONS (Line Chart)
  // ------------------------------
  const dailyData = Object.values(
    transactions.reduce((acc: any, tx) => {
      const date = tx.timestamp.split("T")[0];
      if (!acc[date]) acc[date] = { date, count: 0 };
      acc[date].count += 1;
      return acc;
    }, {})
  );

  // ------------------------------
  // BAR CHART (Deposit/Withdraw/Transfer)
  // ------------------------------
  const typesCount: Record<string, number> = {
    Deposit: 0,
    Withdraw: 0,
    TransferIncoming: 0,
    TransferOutgoing: 0,
  };

  transactions.forEach((t) => {
    if (typesCount[t.type] !== undefined) {
      typesCount[t.type] += 1;
    }
  });

  const barData = [
    { name: "Deposit", value: typesCount.Deposit },
    { name: "Withdraw", value: typesCount.Withdraw },
    { name: "Incoming", value: typesCount.TransferIncoming },
    { name: "Outgoing", value: typesCount.TransferOutgoing },
  ];

  // ------------------------------
  // PIE CHART (Transaction Type Distribution)
  // ------------------------------
  const pieData = barData;
  const pieColors = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>

      {/* KPI CARDS */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Accounts</Typography>
            <Typography variant="h4">{totalAccounts}</Typography>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h4">{transactions.length}</Typography>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Volume</Typography>
            <Typography variant="h5">
              Rs.{" "}
              {transactions
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* LINE CHART */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Daily Transaction Count
        </Typography>
        <LineChart width={900} height={300} data={dailyData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0088FE"
            strokeWidth={2}
          />
        </LineChart>
      </Paper>

      {/* BAR CHART & PIE CHART SIDE BY SIDE */}
      <Grid container spacing={3}>
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Deposits vs Withdrawals vs Transfers
            </Typography>
            <BarChart width={450} height={300} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0088FE" />
            </BarChart>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Transaction Type Distribution
            </Typography>
            <PieChart width={450} height={300}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {pieColors.map((color, index) => (
                  <Cell key={index} fill={color} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
      </Grid>

      {/* FULL TRANSACTIONS TABLE */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Full Transaction Table (Admin Only)
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Account</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.accountId}</TableCell>
                <TableCell align="right">Rs. {tx.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ReportsPage;
