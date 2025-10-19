import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserProfileData } from "../../queries/Admin/UserCommand";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  status: "Active" | "Inactive";
}

const EditUser: React.FC = () => {
  const { id } = useParams(); // id is used here as it is defined in the route
  const navigate = useNavigate();
  const { data: userData } = useGetUserProfileData(id ?? "");

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && userData) {
      setUser({
        id: id,
        fullName: userData.name || "",
        email: userData.email || "",
        status: "Active",
      });
      setLoading(false);
    }
  }, [id, userData]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography textAlign="center" mt={4} color="error">
        User not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={3}>
        Edit User
      </Typography>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        value={user.fullName}
        // onChange={(e) => handleChange("fullName", e.target.value)}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={user.email}
        // onChange={(e) => handleChange("email", e.target.value)}
      />

      <TextField
        select
        label="Status"
        fullWidth
        margin="normal"
        value={user.status}
        // onChange={(e) => handleChange("status", e.target.value)}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
