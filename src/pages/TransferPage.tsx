import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Box,
  Container,
} from "@mui/material";

import { useState } from "react";
import { useGetUserAccountNumber } from "../queries/Transactions/TransactionsCommand";
import { useAuth } from "../context/AuthContext";

interface TransferForm {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  handleTransfer: any;
}

const TransferPage = () => {
  const { register, handletranfer } = useForm<TransferForm>();
  const [success, setSuccess] = useState(false);

  const { getUserId } = useAuth();
  const userId = getUserId() || "";
  const { data: userAccountNumber } = useGetUserAccountNumber(userId);

  const onSubmit = async (data: TransferForm) => {
    try {
      // await axios.post("/transaction/transfer", data);
    } catch (error) {
      console.error("Transfer failed", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" mb={3} gutterBottom>
          Transfer Money
        </Typography>
        <Box
          component="form"
          onSubmit={handletranfer}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="From Account Number"
                fullWidth
                disabled
                required
                defaultValue={userAccountNumber?.accountNumber || ""}
                {...register("fromAccountNumber")}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="To Account Number"
                fullWidth
                required
                {...register("toAccountNumber")}
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
                Transfer
              </Button>
            </Grid>
          </Grid>
        </Box>
        {/* <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Transfer successful"
      /> */}
      </Paper>
    </Container>
  );
};

export default TransferPage;
