import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import CustomToastContainer from "./components/common/custom-toast-container/CustomToastContainer.component";
import UserLayout from "./layouts/UserLayout";
import { AuthContext } from "./context/auth.context";
import VisitorLayout from "./layouts/VisitorLayout";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const { isLoggedIn } = authContext;

  return (
    <>
      <CustomToastContainer />
      <div className={appStyles}>
        {isLoggedIn ? <UserLayout /> : <VisitorLayout />}
      </div>
    </>
  );
};

export default App;
