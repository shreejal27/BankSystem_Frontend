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
  Box,
} from "@mui/material";

import { useAdminDashboardData } from "../../queries/Admin/DashboardCommand";

const AdminDashboard = () => {
  const { isLoading, isError, data: adminData } = useAdminDashboardData();

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError || !adminData) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">Failed to load admin dashboard</Typography>
      </Container>
    );
  }

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
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4" color="primary">
                {adminData?.users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6"> Accounts</Typography>
              <Typography variant="h4" color="success.main">
                {adminData.accounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Transacted Amount</Typography>
              <Typography variant="h4" color="warning.main">
                Rs {adminData.transactedAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ backgroundColor: "#ffebee" }}>
            <CardContent>
              <Typography variant="h6">Transactions Count</Typography>
              <Typography variant="h4" color="error.main">
                {adminData.transactionsCount}
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
                  {/* <TableCell>Role</TableCell> */}
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminData.latestUsers.map((u, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    {/* <TableCell>{u.role}</TableCell> */}
                    <TableCell>
                      {" "}
                      {new Date(u.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
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
                  <TableCell>AccountNumber</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminData.latestTransactions.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.accountNumber}</TableCell>
                    <TableCell>Rs {t.amount.toFixed(2)}</TableCell>
                    <TableCell>{t.type}</TableCell>
                    <TableCell>For Description</TableCell>
                    <TableCell>
                      {new Date(t.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
