import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container disableGutters maxWidth={false}>
      <Outlet />
    </Container>
  );
}

export default Layout;
