import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
//import axios from "../api/Client/apiClientBe";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export const TransactionHistoryPage = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // axios;
    // .get<Transaction[]>(`/transactions/account/me`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    // .then((res) => setTransactions(res.data))
    // .catch((err) => console.error(err))
    // .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Transaction History
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  {new Date(txn.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>{txn.description}</TableCell>
                <TableCell align="right">${txn.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default TransactionHistoryPage;
