import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import axios from "axios";
import { useAuth } from "../context/AuthContext";
import type { DashboardDto } from "../types/DashboardDto";

const Dashboard = () => {
  const { token } = useAuth();
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<DashboardDto>("https://your-api-url/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!data) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Welcome, {data.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="textSecondary">
            {data.email}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Balance</Typography>
              <Typography variant="h4" color="primary">
                ${data.totalBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Transactions
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.recentTransactions.map((t, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Avatar
                          sx={{
                            bgcolor:
                              t.type === "Withdraw" ? "#ef5350" : "#66bb6a",
                            width: 30,
                            height: 30,
                            fontSize: 14,
                          }}
                        >
                          {t.type[0]}
                        </Avatar>{" "}
                        {t.type}
                      </TableCell>
                      <TableCell>${t.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(t.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
