import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { sidebarItemsUser, sidebarItemsAdmin } from "../config/sidebarItems";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Sidebar = () => {
  const { role } = useAuth();
  const menuItems = role === "Admin" ? sidebarItemsAdmin : sidebarItemsUser;

  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Typography variant="h6" noWrap sx={{ padding: 2, textAlign: "center" }}>
        Bank System
      </Typography>
      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
