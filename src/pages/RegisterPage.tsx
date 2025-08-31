import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Box,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

import type { TRegisterSchema } from "../utils/schema/TRegisterSchema";
import { useRegister } from "../queries/auth/AuthCommand";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const [error, setError] = useState("");

  const {
    mutate: registerMutation,
    isSuccess: registerSuccess,
    error: registerError,
    data: registerData,
  } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TRegisterSchema = {
      name: form.fullName,
      email: form.email,
    };
    registerMutation(payload);
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      navigate("/login");
    }
    if (registerError) {
      setError(registerError.message || "Registration failed");
    }
  }, [registerSuccess, registerData, navigate, registerError]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        {error && <Alert color="error">{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
