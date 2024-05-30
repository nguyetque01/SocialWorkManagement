import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import AdminRoutes from "../routes/AdminRoutes";
import Navbar from "../components/navbar/AdminNavbar.component";
import Sidebar from "../components/sidebar/AdminSidebar.component";

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarMode, setSidebarMode] = useState<"full" | "compact" | "none">(
    isMobile ? "none" : "compact"
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setSidebarMode("compact");
    } else {
      if (!sidebarOpen) {
        setSidebarMode("none");
      }
    }
  }, [isMobile, sidebarOpen]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        toggleSidebar={toggleSidebar}
        sidebarMode={sidebarMode}
        isMobile={isMobile}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        sidebarMode={sidebarMode}
        onSidebarModeChange={setSidebarMode}
        isMobile={isMobile}
      />
      <Box
        className="wrapper"
        sx={{
          marginLeft:
            sidebarMode === "full"
              ? "var(--full-sidebar-width)"
              : sidebarMode === "compact"
              ? "var(--small-sidebar-width)"
              : 0,
        }}
      >
        <AdminRoutes />
        
      </Box>
      
      
    </Box>
  );
};

export default AdminLayout;
