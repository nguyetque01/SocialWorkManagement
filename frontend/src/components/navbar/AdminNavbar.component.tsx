import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { Menu, AccountCircle } from "@mui/icons-material";

import "./admin-navbar.scss";
import { Link } from "react-router-dom";

interface AdminNavbarProps {
  toggleSidebar: () => void;
  sidebarMode: "full" | "compact" | "none";
  isMobile: boolean;
}

const AdminNavbar = ({
  toggleSidebar,
  sidebarMode,
  isMobile,
}: AdminNavbarProps) => {
  return (
    <AppBar className="app-bar">
      <Toolbar className={`navbar sidebar-${sidebarMode}`}>
        <Box className="navbar__left">
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            className={`menu-button ${isMobile ? "" : "hidden"}`}
          >
            <Menu className="menu-icon" />
          </IconButton>
          <Link to={"/"} className="brand">
            <Typography variant="h6" color={"white"}>
              Hệ thống quản lý công tác xã hội
            </Typography>
          </Link>
        </Box>
        <Box className="navbar__middle"></Box>
        <Box className="navbar__right">
          <IconButton className="account">
            <AccountCircle className="icon" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
