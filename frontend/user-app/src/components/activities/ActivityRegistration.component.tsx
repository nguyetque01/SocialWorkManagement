import { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivitySessionService from "../../services/ActivitySessionService";
import ActivityService from "../../services/ActivityService";
import { IActivity } from "../../types/activity.typing";
import { IActivitySessionDetail } from "../../types/activity-session.typing";
import { ICreateActivityParticipation } from "../../types/activity-participation.typing";
import "../../styles/grid.scss";
import "../../styles/form.scss";
import "./activity-registration.scss";
import { useCurrentUserId } from "../../hooks/auth.hook";
import ActivityParticipationService from "../../services/ActivityParticipationService";

interface IActivityRegistrationProps {
  activityId: number;
  handleClickCancelBtn: () => void;
}

const ActivityRegistration = ({
  activityId,
  handleClickCancelBtn,
}: IActivityRegistrationProps) => {
  const currentUserId = useCurrentUserId();
  const [loading, setLoading] = useState<boolean>(false);
  const [activitySessions, setActivitySessions] = useState<
    IActivitySessionDetail[]
  >([]);
  const [activity, setActivity] = useState<IActivity>();
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [registerItem, setRegisterItem] =
    useState<ICreateActivityParticipation>({
      activitySessionId: 0,
      studentId: currentUserId,
      registrationStatus: 1,
      attendanceStatus: 0,
      approvalAttendanceStatus: 0,
      status: 0,
      description: "",
    });

  const columns: GridColDef[] = [
    { field: "activityDate", headerName: "Ngày Hoạt Động", width: 150 },
    { field: "session", headerName: "Buổi", width: 150 },
    { field: "startTime", headerName: "Thời Gian Bắt Đầu", width: 150 },
    { field: "endTime", headerName: "Thời Gian Kết Thúc", width: 150 },
    { field: "daysCount", headerName: "Số Ngày", width: 80 },
    { field: "maxParticipants", headerName: "Số Lượng Tối Đa", width: 80 },
    {
      field: "registrationStartTime",
      headerName: "Thời Gian Bắt Đầu Đăng Ký",
      width: 200,
    },
    {
      field: "registrationEndTime",
      headerName: "Thời Gian Kết Thúc Đăng Ký",
      width: 200,
    },
    {
      field: "registrationAcceptanceStatusText",
      headerName: "Trạng Thái Chấp Nhận Đăng Ký",
      width: 220,
    },
    { field: "statusText", headerName: "Trạng Thái", width: 150 },
    { field: "description", headerName: "Mô tả", width: 200 },
  ];

  const fetchActivitySessions = useCallback(async () => {
    try {
      setLoading(true);
      const ActivitySessionsData =
        await ActivitySessionService.getActivitySessionDetailsByActivityId(
          activityId
        );
      setActivitySessions(ActivitySessionsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách buổi hoạt động:", error);
      toast.error("Lỗi khi tải danh sách buổi hoạt động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [activityId]);

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ActivityService.getActivityById(activityId);
      setActivity(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu hoạt động:", error);
      toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }, [activityId]);

  useEffect(() => {
    fetchActivitySessions();
    fetchActivity();
  }, [fetchActivitySessions, fetchActivity]);

  const handleSelectionChange = (
    newRowSelectionModel: GridRowSelectionModel
  ) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleRegister = () => {
    rowSelectionModel.forEach((rowId: GridRowId) =>
      handleRegisterBySessionId(parseInt(rowId.toString()))
    );
    handleClickCancelBtn();
  };

  const handleRegisterBySessionId = async (sessionId: number) => {
    try {
      setLoading(true);
      await ActivityParticipationService.createActivityParticipation({
        activitySessionId: sessionId,
        studentId: currentUserId,
        registrationStatus: 1,
        attendanceStatus: 0,
        approvalAttendanceStatus: 0,
        status: 0,
        description: "",
      });
      toast.success("Đăng ký tham gia thành công!");
    } catch (error) {
      console.error("Lỗi xảy ra trong quá trình đăng ký:", error);
      toast.error("Lỗi xảy ra trong quá trình đăng ký!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="main">
      <Typography className="title">Đăng ký hoạt động</Typography>
      <Typography className="name">{activity?.name}</Typography>
      <Box className="grid">
        {loading ? (
          <CircularProgress size={100} />
        ) : activitySessions.length !== 0 ? (
          <DataGrid
            rows={activitySessions}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
            getRowId={(row) => row.id}
            rowHeight={50}
            disableRowSelectionOnClick
            autoHeight={false}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
          />
        ) : (
          <Typography className="title">Không có thông tin</Typography>
        )}
      </Box>
      {activitySessions.length !== 0 && (
        <Box className="btns">
          <Button
            className="cancel-btn"
            variant="contained"
            onClick={handleClickCancelBtn}
          >
            Hủy
          </Button>
          <Button
            className="save-btn"
            variant="contained"
            onClick={handleRegister}
          >
            Đăng ký
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ActivityRegistration;
