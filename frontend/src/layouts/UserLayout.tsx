import { useState } from "react";
import Routes from "../routes/UserRoutes";
import Navbar from "../components/navbar/UserNavbar.component";
import Sidebar from "../components/sidebar/UserSidebar.component";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <div className="wrapper">
        <Routes />
      </div>
    </>
  );
};

export default UserLayout;
