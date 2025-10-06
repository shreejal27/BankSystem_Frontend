import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import {
  useGetUserProfileData,
  useUpdateUser,
} from "../queries/User/UserCommand";

interface UserProfile {
  fullName: string;
  email: string;
}

export const AccountProfilePage = () => {
  const { getUserId } = useAuth();
  const userId = getUserId() || "";

  const { data: userData } = useGetUserProfileData(userId);

  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    setProfile({
      fullName: userData?.name || "",
      email: userData?.email || "",
    });
  }, [userData]);

  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutate: updateUser } = useUpdateUser(userId);

  const handleSave = async () => {
    updateUser({ name: profile.fullName, email: profile.email });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Account Profile
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Full Name"
          name="fullName"
          value={profile.fullName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success">Profile updated successfully!</Alert>
      </Snackbar>
    </Container>
  );
};

export default AccountProfilePage;
