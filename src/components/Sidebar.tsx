import {
  Collapse,
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
import { useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React from "react";

const drawerWidth = 240;

const Sidebar = () => {
  const { role } = useAuth();
  const menuItems = role === "Admin" ? sidebarItemsAdmin : sidebarItemsUser;

  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (item: any) => {
    if (item.name === "Logout") {
      localStorage.removeItem("token");
    }
    navigate(item.path);
  };

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
          const hasChildren = !!item.children;
          const isActive = location.pathname === item.path;

          const [open, setOpen] = React.useState(false);

          const handleClick = () => {
            if (hasChildren) {
              setOpen(!open);
            } else {
              handleItemClick(item);
            }
          };

          return (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClick} selected={isActive}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                  {hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItemButton>
              </ListItem>

              {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child: any, childIndex: number) => (
                      <ListItemButton
                        key={childIndex}
                        sx={{ pl: 4 }}
                        component={Link}
                        to={child.path}
                        selected={location.pathname === child.path}
                        onClick={() => handleItemClick(child)}
                      >
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
