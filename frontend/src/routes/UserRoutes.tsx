import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Home = lazy(() => import("../pages/home/Home.page"));
const Activities = lazy(() => import("../pages/activities/Activities.page"));

const UserRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
