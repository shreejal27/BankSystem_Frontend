import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

/* -------------------- Dummy Account Data -------------------- */

const account = {
  accountNumber: "**** **** **** 3487",
  accountType: "Savings",
  status: "Active",
  currency: "NPR",
  createdAt: "2024-01-15",
  availableBalance: 9999999013,
  ledgerBalance: 9999999013,
  onHoldAmount: 0,
};

/* -------------------- Dummy Chart Data -------------------- */

const dailyData = [
  { label: "Today", deposit: 12000, withdraw: 4000 },
];

const weeklyData = [
  { label: "Sun", deposit: 2000, withdraw: 500 },
  { label: "Mon", deposit: 4000, withdraw: 1500 },
  { label: "Tue", deposit: 3000, withdraw: 1000 },
  { label: "Wed", deposit: 5000, withdraw: 2000 },
  { label: "Thu", deposit: 1000, withdraw: 300 },
  { label: "Fri", deposit: 7000, withdraw: 2500 },
  { label: "Sat", deposit: 6000, withdraw: 1800 },
];

const monthlyData = [
  { label: "Week 1", deposit: 15000, withdraw: 6000 },
  { label: "Week 2", deposit: 22000, withdraw: 9000 },
  { label: "Week 3", deposit: 18000, withdraw: 7000 },
  { label: "Week 4", deposit: 26000, withdraw: 11000 },
];

/* -------------------- Component -------------------- */

export default function AccountDetails() {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("weekly");

  const chartData =
    range === "daily"
      ? dailyData
      : range === "weekly"
      ? weeklyData
      : monthlyData;

  return (
    <Box p={3} display="flex" flexDirection="column" gap={3}>
      <Typography variant="h5">Account Details</Typography>

      {/* Account Summary */}
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

      {/* Balance Details */}
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

      {/* Quick Actions */}
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

      {/* Transaction Overview */}
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Transaction Overview</Typography>

            <ToggleButtonGroup
              value={range}
              exclusive
              size="small"
              onChange={(_, value) => value && setRange(value)}
            >
              <ToggleButton value="daily">Daily</ToggleButton>
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box width="100%" height={240}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Legend />
                <Bar dataKey="deposit" name="Deposit" />
                <Bar dataKey="withdraw" name="Withdraw" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
