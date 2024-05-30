import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context/theme.context";
import CustomToastContainer from "./components/common/custom-toast-container/CustomToastContainer.component";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import VisitorLayout from "./layouts/VisitorLayout";
import { AuthContext } from "./context/auth.context";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const { user } = authContext;
  const [auth, setAuth] = useState<string>("visitor");

  useEffect(() => {
    if (user) {
      if (user.roleId === 1) {
        setAuth("admin");
      } else {
        setAuth("user");
      }
    }
  }, [user]);

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
