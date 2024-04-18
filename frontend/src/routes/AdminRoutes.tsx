import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const Home = lazy(() => import("../pages/home/Home.page"));
const Activities = lazy(() => import("../pages/activities/Activities.page"));
const ActionTypes = lazy(
  () => import("../pages/action-types/ActionTypes.page")
);
const Faculties = lazy(() => import("../pages/faculties/Faculties.page"));
const AcademicYears = lazy(
  () => import("../pages/academic-years/AcademicYears.page")
);
const ActivityCategories = lazy(
  () => import("../pages/activity-categories/ActivityCategories.page")
);
const ActivitySessions = lazy(
  () => import("../pages/activity-sessions/ActivitySessions.page")
);
const ActivityParticipations = lazy(
  () => import("../pages/activity-participations/ActivityParticipations.page")
);
const Classes = lazy(() => import("../pages/classes/Classes.page"));
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
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/academic-years" element={<AcademicYears />} />
        <Route path="/activity-categories" element={<ActivityCategories />} />
        <Route path="/activity-sessions" element={<ActivitySessions />} />
        <Route path="/activity-participations" element={<ActivityParticipations />} />
        <Route path="/record-histories" element={<RecordHistories />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
