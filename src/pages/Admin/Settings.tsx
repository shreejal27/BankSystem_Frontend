import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";

const SettingsPage: React.FC = () => {
  /* ==============================
     Transaction & Financial Rules
     ============================== */
  const [financialSettings, setFinancialSettings] = useState({
    dailyTransactionLimit: 500000,
    minimumBalance: 1000,
    overdraftEnabled: false,
    overdraftLimit: 20000,
    depositCharge: 0,
    withdrawalCharge: 10,
    transferCharge: 15,
    interestRate: 5,
  });

  /* ==============================
     Notification Settings
     ============================== */
  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    notifyOnLargeTransaction: true,
    notifyOnPasswordChange: true,
    notifyOnFailedLogin: true,
  });

  const handleFinancialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinancialSettings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const saveFinancialSettings = () => {
    console.log("Saving financial settings", financialSettings);
    // API CALL HERE
  };

  const saveNotificationSettings = () => {
    console.log("Saving notification settings", notificationSettings);
    // API CALL HERE
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        System Settings
      </Typography>

      {/* =============================
          Transaction & Financial Rules
         ============================= */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Transaction & Financial Rules
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Daily Transaction Limit (NPR)"
                name="dailyTransactionLimit"
                type="number"
                value={financialSettings.dailyTransactionLimit}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Minimum Balance (NPR)"
                name="minimumBalance"
                type="number"
                value={financialSettings.minimumBalance}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Overdraft Limit (NPR)"
                name="overdraftLimit"
                type="number"
                disabled={!financialSettings.overdraftEnabled}
                value={financialSettings.overdraftLimit}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={financialSettings.overdraftEnabled}
                    onChange={(e) =>
                      setFinancialSettings((prev) => ({
                        ...prev,
                        overdraftEnabled: e.target.checked,
                      }))
                    }
                  />
                }
                label="Enable Overdraft"
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Deposit Charge (NPR)"
                name="depositCharge"
                type="number"
                value={financialSettings.depositCharge}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Withdrawal Charge (NPR)"
                name="withdrawalCharge"
                type="number"
                value={financialSettings.withdrawalCharge}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Transfer Charge (NPR)"
                name="transferCharge"
                type="number"
                value={financialSettings.transferCharge}
                onChange={handleFinancialChange}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                label="Interest Rate (%)"
                name="interestRate"
                type="number"
                value={financialSettings.interestRate}
                onChange={handleFinancialChange}
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={saveFinancialSettings}>
              Save Financial Settings
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* =============================
          Notification Settings
         ============================= */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Notification Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.emailEnabled}
                    onChange={handleNotificationChange}
                    name="emailEnabled"
                  />
                }
                label="Enable Email Notifications"
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.smsEnabled}
                    onChange={handleNotificationChange}
                    name="smsEnabled"
                  />
                }
                label="Enable SMS Notifications"
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyOnLargeTransaction}
                    onChange={handleNotificationChange}
                    name="notifyOnLargeTransaction"
                  />
                }
                label="Notify on Large Transactions"
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyOnPasswordChange}
                    onChange={handleNotificationChange}
                    name="notifyOnPasswordChange"
                  />
                }
                label="Notify on Password Change"
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notificationSettings.notifyOnFailedLogin}
                    onChange={handleNotificationChange}
                    name="notifyOnFailedLogin"
                  />
                }
                label="Notify on Failed Login Attempts"
              />
            </Grid>
          </Grid>

          <Box mt={3} textAlign="right">
            <Button variant="contained" onClick={saveNotificationSettings}>
              Save Notification Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
