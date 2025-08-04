import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container sx={{ mt: 4 }}>
      <Outlet />
    </Container>
  );
}

export default Layout;
