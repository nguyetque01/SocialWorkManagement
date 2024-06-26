import { useEffect, useState, useCallback } from "react";
import { ICreateActivitySession } from "../../types/activity-session.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivitySessionService from "../../services/ActivitySessionService";
import "../../styles/form.scss";

interface IActivitySessionFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newActivitySession: number) => void;
  activitySessionId: number;
}

const ActivitySessionForm = ({
  activitySessionId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActivitySessionFormProps) => {
  const [ActivitySession, setActivitySession] =
    useState<ICreateActivitySession>({
      session: "",
      status: 0,
      description: "",
    });

  const [loading, setLoading] = useState(false);
  const isEditing = activitySessionId !== 0;

  const fetchActivitySessionData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ActivitySessionService.getActivitySessionById(
          activitySessionId
        );
        setActivitySession(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu buổi hoạt động:", error);
        toast.error("Lỗi khi tải dữ liệu buổi hoạt động. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, activitySessionId]);

  useEffect(() => {
    fetchActivitySessionData();
  }, [fetchActivitySessionData]);

  const handleInputChange = (field: string, value: string) => {
    setActivitySession((prevActivitySession) => ({
      ...prevActivitySession,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (ActivitySession.session === "") {
      toast.error("Vui lòng nhập tên buổi hoạt động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ActivitySessionService.updateActivitySession(
          activitySessionId,
          ActivitySession
        )
      : ActivitySessionService.createActivitySession(ActivitySession);

    savePromise
      .then((newActivitySession) => {
        const newActivitySessionId = newActivitySession?.id || 0;
        toast.success("buổi hoạt động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newActivitySessionId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu buổi hoạt động!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isEditing && loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <Paper elevation={3} className="form">
          <Typography variant="h5" gutterBottom>
            {isEditing ? "Chỉnh sửa buổi hoạt động" : "Thêm buổi hoạt động mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên buổi hoạt động"
                variant="outlined"
                value={ActivitySession.session}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={ActivitySession.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <div className="btns">
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
              onClick={handleClickSaveBtn}
            >
              Lưu
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
};

export default ActivitySessionForm;
