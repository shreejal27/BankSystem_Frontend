import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Box,
} from "@mui/material";

//import { useAdminDashboardData } from "../queries/Dashboard/AdminDashboardCommand";

const AdminDashboard = () => {
  //const { isLoading, isError, data: adminData } = useAdminDashboardData();

  //   if (isLoading) {
  //     return (
  //       <Container sx={{ mt: 5, textAlign: "center" }}>
  //         <CircularProgress />
  //       </Container>
  //     );
  //   }

  //   if (isError || !adminData) {
  //     return (
  //       <Container sx={{ mt: 5, textAlign: "center" }}>
  //         <Typography color="error">Failed to load admin dashboard</Typography>
  //       </Container>
  //     );
  //   }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome back, Admin!
      </Typography>

      <Grid container columns={12} spacing={2} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" color="primary">
                {/* {adminData.totalUsers} */}
                500
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6">Total Accounts</Typography>
              <Typography variant="h4" color="success.main">
                {/* {adminData.totalAccounts} */}
                200
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Total Balance</Typography>
              <Typography variant="h4" color="warning.main">
                {/* Rs {adminData.totalBalance.toFixed(2)} */}
                Rs. 10000.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#ffebee" }}>
            <CardContent>
              <Typography variant="h6">Total Transactions</Typography>
              <Typography variant="h4" color="error.main">
                {/* {adminData.totalTransactions} */}
                1500
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Registered Users
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Accounts</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {adminData.users.map((u, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{u.accountCount}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {adminData.recentTransactions.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.userName}</TableCell>
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
                    <TableCell>Rs {t.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(t.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
