import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface TransferForm {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}

export const TransferPage = () => {
  const { register, handleSubmit, reset } = useForm<TransferForm>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: TransferForm) => {
    try {
      await axios.post("http://localhost:5000/api/transaction/transfer", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess(true);
      reset();
    } catch (error) {
      console.error("Transfer failed", error);
    }
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" mb={2}>
        Transfer Funds
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="From Account Number"
              fullWidth
              {...register("fromAccountNumber", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="To Account Number"
              fullWidth
              {...register("toAccountNumber", { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              {...register("amount", { required: true, min: 1 })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Transfer
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Transfer successful"
      />
    </Paper>
  );
};
