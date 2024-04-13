import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./admin-navbar.scss";

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
        <Typography variant="h6">Hệ thống quản lý công tác xã hội</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
