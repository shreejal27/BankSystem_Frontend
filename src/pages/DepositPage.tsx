import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/Client/apiClientBe"; 

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || amount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }
    if (!accountNumber.trim()) {
      setError("Please enter account number.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post("/transactions/deposit", {
        accountNumber,
        amount,
      });

      if (response.data) {
        setSuccess("Deposit successful!");
        setAmount("");
        setAccountNumber("");
        setTimeout(() => navigate("/dashboard"), 1500); // redirect after success
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Deposit Money
        </Typography>

        <Box component="form" onSubmit={handleDeposit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Account Number"
                fullWidth
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Deposit Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
              />
            </Grid>
            {error && (
              <Grid size={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            {success && (
              <Grid size={12}>
                <Typography color="success.main">{success}</Typography>
              </Grid>
            )}
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default DepositPage;
