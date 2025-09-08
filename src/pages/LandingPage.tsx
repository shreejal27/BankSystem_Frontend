import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="primary">
            BankSecure
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              component={RouterLink}
              to="/login"
              color="primary"
              variant="text"
            >
              Login
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              color="primary"
              variant="outlined"
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          Welcome to BankSecure
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Your trusted partner in digital banking. Securely manage your account,
          track transactions, and access smart financial tools—anytime,
          anywhere.
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
          >
            Login
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            variant="outlined"
            color="primary"
            size="large"
          >
            Register
          </Button>
        </Stack>
      </Container>

      {/* Features Section (Dummy Data) */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Why Choose BankSecure?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔒 Secure Banking
                </Typography>
                <Typography color="text.secondary">
                  Advanced encryption keeps your transactions and data safe at
                  all times.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ⚡ Instant Transfers
                </Typography>
                <Typography color="text.secondary">
                  Send and receive money instantly, anywhere in the world.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Smart Tools
                </Typography>
                <Typography color="text.secondary">
                  Track spending, create budgets, and get personalized insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: "#f5f5f5", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid size={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                500K+
              </Typography>
              <Typography color="text.secondary">Happy Customers</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                99.9%
              </Typography>
              <Typography color="text.secondary">Uptime Guarantee</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                24/7
              </Typography>
              <Typography color="text.secondary">Customer Support</Typography>
            </Grid>
            <Grid size={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                120+
              </Typography>
              <Typography color="text.secondary">Countries Served</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          What Our Customers Say
        </Typography>
        <Stack spacing={3} mt={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="body1">
              “BankSecure has completely changed the way I manage my finances.
              Transfers are lightning fast!”
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              — John Doe, Small Business Owner
            </Typography>
          </Card>
          <Card sx={{ p: 2 }}>
            <Typography variant="body1">
              “I feel safe knowing my money is secure with BankSecure’s advanced
              security features.”
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              — Sarah Smith, Teacher
            </Typography>
          </Card>
        </Stack>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ textAlign: "center", py: 2, backgroundColor: "#f5f5f5" }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} BankSecure. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;

....................

