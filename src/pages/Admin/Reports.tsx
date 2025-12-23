import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const kpiData = [
  { title: "Total Transactions", value: "12,450", color: "#1976d2" },
  { title: "Total Deposits (NPR)", value: "45,200,000", color: "#2e7d32" },
  { title: "Total Withdrawals (NPR)", value: "31,600,000", color: "#d32f2f" },
  { title: "Net Cash Flow (NPR)", value: "+13,600,000", color: "#0288d1" },
  { title: "Active Accounts", value: "3,284", color: "#6a1b9a" },
];

const transactionChartData = [
  { day: "Mon", deposits: 1200000, withdrawals: 900000 },
  { day: "Tue", deposits: 1500000, withdrawals: 1100000 },
  { day: "Wed", deposits: 1000000, withdrawals: 700000 },
  { day: "Thu", deposits: 1800000, withdrawals: 1300000 },
  { day: "Fri", deposits: 2200000, withdrawals: 500000 },
  { day: "Sat", deposits: 1100000, withdrawals: 1600000 },
  { day: "Sun", deposits: 900000, withdrawals: 700000 },
];

const Reports: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Reports Overview
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Financial performance and system activity snapshot
      </Typography>

      <Grid container spacing={3} mb={4}>
        {kpiData.map((kpi, index) => (
          <Grid size={4} key={index}>
            <Card
              sx={{
                borderLeft: `6px solid ${kpi.color}`,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {kpi.title}
                </Typography>
                <Typography variant="h6" fontWeight={700} mt={1}>
                  {kpi.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              Transaction Summary (Weekly)
            </Typography>

            <Box>
              <Button size="small" startIcon={<DownloadIcon />} sx={{ mr: 1 }}>
                CSV
              </Button>
              <Button size="small" startIcon={<DownloadIcon />}>
                PDF
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box height={300}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionChartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deposits" />
                <Bar dataKey="withdrawals" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Financial Snapshot
              </Typography>

              <Typography variant="body2">
                • Total Fees Collected: <b>NPR 1,250,000</b>
              </Typography>
              <Typography variant="body2">
                • Interest Paid: <b>NPR 2,800,000</b>
              </Typography>
              <Typography variant="body2">
                • Overdraft Usage: <b>NPR 640,000</b>
              </Typography>

              <Box mt={3} textAlign="right">
                <Button size="small" startIcon={<DownloadIcon />}>
                  Download Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Audit Activity Snapshot
              </Typography>

              <Typography variant="body2">
                • Failed Login Attempts: <b>18</b>
              </Typography>
              <Typography variant="body2">
                • Role Changes: <b>4</b>
              </Typography>
              <Typography variant="body2">
                • Manual Overrides: <b>2</b>
              </Typography>

              <Box mt={3} textAlign="right">
                <Button size="small" startIcon={<DownloadIcon />}>
                  Download Logs
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
