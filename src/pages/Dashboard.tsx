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
} from "@mui/material";

import { useDashboardData } from "../queries/Dashboard/DashboardCommand";

const Dashboard = () => {
  const { isLoading, isError, data: dashboardData } = useDashboardData();

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

  const getTransactionType = (type: number) => {
    switch (type) {
      case 0:
        return { label: "Deposit", color: "#66bb6a" };
      case 1:
        return { label: "Withdraw", color: "#ef5350" };
      case 2:
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
              <Typography variant="h4" color="primary">
                Rs {dashboardData.totalBalance.toFixed(2)}
              </Typography>
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
                          {t?.createdAt
                            ? new Date(t.createdAt).toLocaleString()
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
