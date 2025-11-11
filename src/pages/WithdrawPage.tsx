import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Box,
  Container,
} from "@mui/material";
//import axios from "../api/Client/apiClientBe";
import { useEffect, useState } from "react";
import {
  useGetUserAccountNumber,
  useWithdraw,
} from "../queries/Transactions/TransactionsCommand";
import { useAuth } from "../context/AuthContext";
import type { IWithdraw } from "../types/TransactionsDto";

export const WithdrawPage = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [accountNumber, setAccountNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { getUserId } = useAuth();
  const userId = getUserId() || "";

  const { data: userAccountNumber } = useGetUserAccountNumber(userId);

  useEffect(() => {
    if (userAccountNumber) {
      setAccountNumber(userAccountNumber.accountNumber);
    }
  }, [userAccountNumber]);

  const {
    mutate: withdrawMutation,
    isSuccess: withdrawSuccess,
    error: withdrawError,
    data: withdrawData,
  } = useWithdraw();

  const handleWithdraw = async (e: React.FormEvent) => {
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
    const payload: IWithdraw = {
      accountNumber: accountNumber,
      amount: amount,
    };
    try {
      setLoading(true);
      withdrawMutation(payload);
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
        <Typography variant="h5" align="center" mb={3} gutterBottom>
          Withdraw Money
        </Typography>

        <Box component="form" onSubmit={handleWithdraw}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Account Number"
                fullWidth
                value={accountNumber}
                disabled
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Withdraw Amount"
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
                color="error"
                fullWidth
                disabled={loading}
              >
                {loading ? "Processing..." : "Withdraw"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default WithdrawPage;
