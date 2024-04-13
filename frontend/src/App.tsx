import { useContext } from "react";
import { ThemeContext } from "./context/theme.context";
import CustomToastContainer from "./components/common/custom-toast-container/CustomToastContainer.component";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <>
      <CustomToastContainer />
      <div className={appStyles}>
        <AdminLayout />
        {/* <UserLayout /> */}
      </div>
    </>
  );
};

export default App;
