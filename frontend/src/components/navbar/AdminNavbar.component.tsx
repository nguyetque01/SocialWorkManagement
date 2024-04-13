import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          className={`menu-button ${isMobile ? "" : "hidden"}`}
        >
          <MenuIcon className="menu-icon" />
        </IconButton>
        <Link to={"/"}>
          <Typography variant="h6" color={"white"}>
            Hệ thống quản lý công tác xã hội
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
