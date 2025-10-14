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
import axios from "axios";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  status: "Active" | "Inactive";
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (field: keyof IUser, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // ✅ Save updates
  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      await axios.put(`/api/users/${user.id}`, user);
      navigate("/admin/users"); // Go back after saving
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

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
        onChange={(e) => handleChange("fullName", e.target.value)}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={user.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <TextField
        select
        label="Status"
        fullWidth
        margin="normal"
        value={user.status}
        onChange={(e) => handleChange("status", e.target.value)}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
