import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Login = lazy(() => import("../pages/login/Login.page"));
const Logout = lazy(() => import("../pages/logout/Logout.page"));
const Home = lazy(() => import("../pages/home/Home.page"));
const Activities = lazy(() => import("../pages/activities/Activities.page"));
const RegisteredActivities = lazy(
  () => import("../pages/activities/RegisteredActivities.page")
);
const Error = lazy(() => import("../pages/errors/Error.page"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/activities" element={<Activities />} />
        <Route
          path="/registerd-activities"
          element={<RegisteredActivities />}
        />
        <Route path="*" element={<Error errorCode={404} />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
