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
import type { IGetUserProfileAdminResponse } from "../../types/UserDto";

const EditUser: React.FC = () => {
  const { id } = useParams(); // id is used here as it is defined in the route
  const navigate = useNavigate();
  const { data: userData } = useGetUserProfileData(id ?? "");

  console.log("User Data:", userData);

  const [user, setUser] = useState<IGetUserProfileAdminResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && userData) {
      setUser({
        id: id,
        name: userData.name || "",
        email: userData.email || "",
        isActive: userData.isActive,
        role: userData.role,
        createdAt: userData.createdAt,
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
        value={user.name}
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
        value={user.isActive}
        // onChange={(e) => handleChange("status", e.target.value)}
      >
        <MenuItem value="true">Active</MenuItem>
        <MenuItem value="false">Inactive</MenuItem>
      </TextField>

      <TextField
        label="Role"
        fullWidth
        margin="normal"
        value={user.role}
        // onChange={(e) => handleChange("email", e.target.value)}
      />

      <TextField
        label="Registered Date"
        fullWidth
        margin="normal"
        value={user.createdAt}
        disabled
        // onChange={(e) => handleChange("email", e.target.value)}
      />

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
