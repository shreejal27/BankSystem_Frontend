import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

export const sidebarItemsUser = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Accounts", path: "/accounts", icon: <AccountBalanceIcon /> },
  { name: "Deposit", path: "/deposit", icon: <AttachMoneyIcon /> },
  { name: "Withdraw", path: "/withdraw", icon: <AttachMoneyIcon /> },
  { name: "Transfer", path: "/transfer", icon: <SwapHorizIcon /> },
  { name: "Transactions", path: "/transactions", icon: <HistoryIcon /> },
  { name: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
];

export const sidebarItemsAdmin = [
  { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { name: "Manage Users", path: "/users", icon: <PeopleIcon /> },
  { name: "Manage Accounts", path: "/accounts", icon: <AccountBalanceIcon /> },
  { name: "Transactions", path: "/transactions", icon: <HistoryIcon /> },
  { name: "Reports", path: "/reports", icon: <BarChartIcon /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
];
