import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Stack,
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

      {/* Hero Section */}
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
