import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Login = lazy(() => import("../pages/login/Login.page"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
