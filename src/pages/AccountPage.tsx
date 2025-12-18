import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

const account = {
  accountNumber: "**** **** **** 3487",
  accountType: "Savings",
  status: "Active",
  currency: "NPR",
  createdAt: "2024-01-15",
  availableBalance: 9999999013.0,
  ledgerBalance: 9999999013.0,
  onHoldAmount: 0.0,
};

const transactions = [
  {
    id: 1,
    type: "Deposit",
    amount: 11.0,
    balanceAfter: 9999999013.0,
    date: "11/12/2025, 4:26:04 PM",
    remarks: "Cash Deposit",
  },
  {
    id: 2,
    type: "Transfer",
    amount: 999.0,
    balanceAfter: 9999999002.0,
    date: "11/11/2025, 5:58:47 PM",
    remarks: "Fund Transfer",
  },
  {
    id: 3,
    type: "Withdraw",
    amount: 3.0,
    balanceAfter: 9999998003.0,
    date: "11/11/2025, 5:51:38 PM",
    remarks: "ATM Withdrawal",
  },
];

const columns: GridColDef[] = [
  { field: "type", headerName: "Type", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "balanceAfter", headerName: "Balance After", flex: 1 },
  { field: "date", headerName: "Date", flex: 1.5 },
  { field: "remarks", headerName: "Remarks", flex: 1.5 },
];

export default function AccountDetails() {
  return (
    <Box p={3} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">Account Details</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">Account Summary</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Account Number: {account.accountNumber}</Typography>
          <Typography>Account Type: {account.accountType}</Typography>
          <Typography>Status: {account.status}</Typography>
          <Typography>Currency: {account.currency}</Typography>
          <Typography>Created At: {account.createdAt}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Balance Details</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            Available Balance: Rs {account.availableBalance.toLocaleString()}
          </Typography>
          <Typography>
            Ledger Balance: Rs {account.ledgerBalance.toLocaleString()}
          </Typography>
          <Typography>
            On Hold Amount: Rs {account.onHoldAmount.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Quick Actions</Typography>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button variant="contained">Deposit</Button>
            <Button variant="contained">Withdraw</Button>
            <Button variant="contained">Transfer</Button>
            <Button variant="outlined">Download Statement</Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Transaction History
          </Typography>
          <DataGrid
            rows={transactions}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
    </Box>
  );
}
