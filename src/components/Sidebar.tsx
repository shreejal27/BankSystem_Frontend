import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { sidebarItemsUser, sidebarItemsAdmin } from "../config/sidebarItems";

interface SidebarProps {
  role: "User" | "Admin"; // based on JWT
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
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
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
