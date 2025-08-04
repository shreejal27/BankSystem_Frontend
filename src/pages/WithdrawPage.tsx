import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
} from "@mui/material";
import axios from "../api/axios";
import { useState } from "react";

interface WithdrawForm {
  accountNumber: string;
  amount: number;
}

export const WithdrawPage = () => {
  const { register, handleSubmit } = useForm<WithdrawForm>();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: WithdrawForm) => {
    try {
      await axios.post("transaction/withdraw", data);
    } catch (error) {
      console.error("Withdraw failed", error);
    }
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" mb={2}>
        Withdraw Funds
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Account Number"
              fullWidth
              {...register("accountNumber", { required: true })}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Amount"
              type="number"
              fullWidth
              {...register("amount", { required: true, min: 1 })}
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Withdrawal successful"
      />
    </Paper>
  );
};

export default WithdrawPage;
