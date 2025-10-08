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
} from "@mui/material";

import { useDashboardData } from "../queries/Dashboard/DashboardCommand";

const Dashboard = () => {
  const { isLoading, isError, data: dashboardData } = useDashboardData();

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
                  {dashboardData.recentTransactions.map((t, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {t?.type ? (
                          <>
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
                          </>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>

                      <TableCell>
                        {t?.amount != null ? `$${t.amount.toFixed(2)}` : "N/A"}
                      </TableCell>

                      <TableCell>
                        {t?.timestamp
                          ? new Date(t.timestamp).toLocaleString()
                          : "N/A"}
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
