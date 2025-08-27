import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { sidebarItemsUser, sidebarItemsAdmin } from "../config/sidebarItems";
import { useTokenDecodedData } from "../hooks/useTokenDecodedData";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const decodedData = useTokenDecodedData(localStorage.getItem("token") || "");
  const role = decodedData?.role;

  const menuItems = role === "Admin" ? sidebarItemsAdmin : sidebarItemsUser;

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
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
