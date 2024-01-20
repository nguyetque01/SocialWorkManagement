import { useContext, lazy, Suspense } from "react";
import { ThemeContext } from "./context/theme.context";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
import CustomLinearProgress from "./components/custom-linear-progress/CustomLinearProgress.component";

// Import with Lazy Loading
const Home = lazy(() => import("./pages/home/Home.page"));
const Activities = lazy(() => import("./pages/activities/Activities.page"));

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  const appStyles = darkMode ? "app dark" : "app";

  return (
    <div className={appStyles}>
      <Navbar />
      <div className="wrapper">
        <Suspense fallback={<CustomLinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" index element={<Activities />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
