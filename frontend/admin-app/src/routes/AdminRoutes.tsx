import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLinearProgress from "../components/common/custom-linear-progress/CustomLinearProgress.component";

const AdminDashboard = lazy(
  () => import("../pages/admin-dashboard/AdminDashboard.page")
);
const Logout = lazy(() => import("../pages/logout/Logout.page"));
const Users = lazy(() => import("../pages/users/Users.page"));
const Roles = lazy(() => import("../pages/roles/Roles.page"));
const Permissions = lazy(() => import("../pages/permissions/Permissions.page"));
const RolePermissions = lazy(
  () => import("../pages/role-permissions/RolePermissions.page")
);
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
const AttendanceComplaints = lazy(
  () => import("../pages/attendance-complaints/AttendanceComplaints.page")
);
const Classes = lazy(() => import("../pages/classes/Classes.page"));
const RecordHistories = lazy(
  () => import("../pages/record-histories/RecordHistories.page")
);
const Notifications = lazy(
  () => import("../pages/notifications/Notifications.page")
);
const NotificationTypes = lazy(
  () => import("../pages/notification-types/NotificationTypes.page")
);

const AdminRoutes = () => {
  return (
    <Suspense fallback={<CustomLinearProgress />}>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<Users />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/role-permissions" element={<RolePermissions />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/action-types" element={<ActionTypes />} />
        <Route path="/faculties" element={<Faculties />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/academic-years" element={<AcademicYears />} />
        <Route path="/activity-categories" element={<ActivityCategories />} />
        <Route path="/activity-sessions" element={<ActivitySessions />} />
        <Route
          path="/activity-participations"
          element={<ActivityParticipations />}
        />
        <Route
          path="/activity-attendance-complaints"
          element={<AttendanceComplaints />}
        />
        <Route path="/record-histories" element={<RecordHistories />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/notification-types" element={<NotificationTypes />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
