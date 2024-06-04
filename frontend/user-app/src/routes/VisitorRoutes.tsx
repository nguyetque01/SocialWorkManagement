import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Login = lazy(() => import("../pages/login/Login.page"));
const Error = lazy(() => import("../pages/errors/Error.page"));

const VisitorRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error errorCode={404} />} />
      </Routes>
    </Suspense>
  );
};

export default VisitorRoutes;
