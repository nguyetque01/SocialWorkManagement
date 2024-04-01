import { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/theme.context";
import CustomLinearProgress from "./components/common/custom-linear-progress/CustomLinearProgress.component";
import Navbar from "./components/navbar/Navbar.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/home/Home.page"));
const Activities = lazy(() => import("./pages/activities/Activities.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities">
              <Route index element={<Activities />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
