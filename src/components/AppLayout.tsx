import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
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
      <Sidebar />
      <Box component="main">
        <Outlet />
      </Box>
    </Container>
  );
}

export default AppLayout;
