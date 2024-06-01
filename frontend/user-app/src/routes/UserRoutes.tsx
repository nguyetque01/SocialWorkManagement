import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Login = lazy(() => import("../pages/login/Login.page"));
const Logout = lazy(() => import("../pages/logout/Logout.page"));
const Home = lazy(() => import("../pages/home/Home.page"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
