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

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export const AccountProfilePage = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get<UserProfile>("/users/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setProfile(res.data))
  //     .catch((err) => console.error(err));
  // }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    // try {
    //   await axios.put("/users/me", profile, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   setSuccessOpen(true);
    // } catch (err) {
    //   console.error(err);
    // }
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
