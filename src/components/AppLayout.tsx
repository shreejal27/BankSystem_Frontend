import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useTokenDecodedData } from "../hooks/useTokenDecodedData";

function AppLayout() {
  const decodedData = useTokenDecodedData(localStorage.getItem("token") || "");

  const role: "User" | "Admin" =
    decodedData?.role === "Admin" ? "Admin" : "User";

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <Sidebar role={role} />
      <Box component="main">
        <Outlet />
      </Box>
    </Container>
  );
}

export default AppLayout;
