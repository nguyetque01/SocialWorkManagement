import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import CustomToastContainer from "./components/common/custom-toast-container/CustomToastContainer.component";
import AdminLayout from "./layouts/AdminLayout";
import { AuthContext } from "./context/auth.context";
import VisitorLayout from "./layouts/VisitorLayout";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const { isLoggedIn, user } = authContext;

  return (
    <>
      <CustomToastContainer />
      <div className={appStyles}>
        {isLoggedIn && user?.roleId === 1 ? <AdminLayout /> : <VisitorLayout />}
      </div>
    </>
  );
};

export default App;
