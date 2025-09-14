import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";

import type { TLoginSchema } from "../utils/schema/TLoginSchema";
import { useLogin } from "../queries/auth/AuthCommand";
import axios from "axios";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    mutate: loginMutation,
    isSuccess: loginSuccess,
    error: loginError,
    data: loginData,
  } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TLoginSchema = {
      email,
      password,
    };
    loginMutation(payload);
  };

  useEffect(() => {
    if (loginSuccess && loginData.statusCode === 200) {
      localStorage.setItem("token", loginData.data.token);
      navigate("/dashboard");
    }
    if (loginError) {
      if (axios.isAxiosError(loginError)) {
        const apiMessage = loginError.response?.data?.message;
        setError(apiMessage || "Login failed");
      } else {
        setError("Unexpected error");
      }
    }
  }, [loginSuccess, loginError, loginData, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} mt={2}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <Grid size={12}>
              <Link to="/register">Don't have an account? Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
