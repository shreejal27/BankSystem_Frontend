// src/components/Navbar.tsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
