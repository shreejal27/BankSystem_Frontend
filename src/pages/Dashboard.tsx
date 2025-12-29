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
  Grid,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";

import { useDashboardData } from "../queries/Dashboard/DashboardCommand";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Dashboard = () => {
  const { isLoading, isError, data: dashboardData } = useDashboardData();

  const [showBalance, setShowBalance] = useState(false);

  console.log("Dashboard Data:", dashboardData);

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !dashboardData) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">Failed to load dashboard</Typography>
      </Container>
    );
  }

  const getTransactionType = (type: string) => {
    switch (type) {
      case "Deposit":
        return { label: "Deposit", color: "#66bb6a" };
      case "Withdraw":
        return { label: "Withdraw", color: "#ef5350" };
      case "Transfer":
        return { label: "Transfer", color: "#42a5f5" };
      default:
        return { label: "Unknown", color: "#bdbdbd" };
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h4" gutterBottom>
            Welcome Back, {dashboardData.name}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Balance</Typography>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" color="primary">
                  {showBalance
                    ? `Rs ${dashboardData.totalBalance.toFixed(2)}`
                    : "Rs ******"}
                </Typography>

                <Tooltip title={showBalance ? "Hide balance" : "Show balance"}>
                  <IconButton
                    size="small"
                    onClick={() => setShowBalance((prev) => !prev)}
                  >
                    {showBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
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
                  {dashboardData.recentTransactions.map((t, index) => {
                    const { label, color } = getTransactionType(t.type);

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              sx={{
                                bgcolor: color,
                                width: 30,
                                height: 30,
                                fontSize: 14,
                              }}
                            >
                              {label[0]}
                            </Avatar>
                            {label}
                          </Box>
                        </TableCell>

                        <TableCell>
                          {t?.amount != null
                            ? `$${t.amount.toFixed(2)}`
                            : "N/A"}
                        </TableCell>

                        <TableCell>
                          {t?.timestamp
                            ? new Date(t.timestamp).toLocaleString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
