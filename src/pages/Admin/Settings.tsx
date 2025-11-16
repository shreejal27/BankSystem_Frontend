import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Alert,
} from "@mui/material";

const AdminSettings: React.FC = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFA, setTwoFA] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    setSuccessMessage("Settings updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" fontWeight={600} mb={3}>
        Admin Settings
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Admin Login Settings
          </Typography>

          <TextField
            fullWidth
            label="Admin Email"
            variant="outlined"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                type="password"
                label="Old Password"
                variant="outlined"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Update Login
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            System Controls
          </Typography>

          <FormControlLabel
            control={
              <Switch checked={twoFA} onChange={() => setTwoFA(!twoFA)} />
            }
            label="Enable Two-Factor Authentication"
          />

          <Divider sx={{ my: 2 }} />

          <FormControlLabel
            control={
              <Switch
                checked={maintenanceMode}
                onChange={() => setMaintenanceMode(!maintenanceMode)}
              />
            }
            label="Enable Maintenance Mode"
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save System Settings
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminSettings;
