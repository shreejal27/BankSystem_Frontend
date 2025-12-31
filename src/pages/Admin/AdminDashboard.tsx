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
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4" color="primary">
                {adminData?.users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6"> Accounts</Typography>
              <Typography variant="h4" color="success.main">
                {adminData.accounts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Transacted Amount</Typography>
              <Typography variant="h4" color="warning.main">
                {adminData.transactedAmount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
              <strong>Registered Users</strong>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Created At</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminData.latestUsers.map((u, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
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
              <strong>Recent Transactions</strong>
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Created At</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminData.latestTransactions.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.email}</TableCell>
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
