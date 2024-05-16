import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context/theme.context";
import CustomToastContainer from "./components/common/custom-toast-container/CustomToastContainer.component";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import VisitorLayout from "./layouts/VisitorLayout";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  const [auth, setAuth] = useState<string>("visitor");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setAuth("user");
    }
    if (role === "Admin") {
      setAuth("admin");
    }
  }, []);

  return (
    <>
      <CustomToastContainer />
      <div className={appStyles}>
        {auth === "visitor" && <VisitorLayout />}
        {auth === "user" && <UserLayout />}
        {auth === "admin" && <AdminLayout />}
      </div>
    </>
  );
};

export default App;
