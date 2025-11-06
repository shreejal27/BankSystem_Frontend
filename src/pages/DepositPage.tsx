import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import {
  useDeposit,
  useGetUserAccountNumber,
} from "../queries/Transactions/TransactionsCommand";
import { useAuth } from "../context/AuthContext";
import type { IDeposit } from "../types/TransactionsDto";

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    mutate: depositMutation,
    isSuccess: depositSuccess,
    error: depositError,
    data: depositData,
  } = useDeposit();

  const { getUserId } = useAuth();
  const userId = getUserId() || "";

  const { data: userAccountNumber } = useGetUserAccountNumber(userId);

  useEffect(() => {
    if (userAccountNumber) {
      setAccountNumber(userAccountNumber.accountNumber);
    }
  }, [userAccountNumber]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || amount <= 0) {
      setError("Please enter a valid deposit amount.");
      return;
    }
    if (!accountNumber.trim()) {
      setError("Please enter valid account number.");
      return;
    }
    const payload: IDeposit = {
      accountNumber: accountNumber,
      amount: amount,
    };
    try {
      setLoading(true);
      depositMutation(payload);
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
                disabled
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
