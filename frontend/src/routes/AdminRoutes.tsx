import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Home = lazy(() => import("../pages/home/Home.page"));
const Activities = lazy(() => import("../pages/activities/Activities.page"));
const ActionTypes = lazy(
  () => import("../pages/action-types/ActionTypes.page")
);
const Faculty = lazy(
  () => import("../pages/faculty/Faculty.page")
);
const RecordHistories = lazy(
  () => import("../pages/record-histories/RecordHistories.page")
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/action-types" element={<ActionTypes />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/record-histories" element={<RecordHistories />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
