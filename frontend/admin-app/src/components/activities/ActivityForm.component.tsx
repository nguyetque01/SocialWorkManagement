import { useEffect, useState, useCallback } from "react";
import { ICreateActivity } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivityService from "../../services/ActivityService";
import "../../styles/form.scss";

interface IActivityFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newActivityId: number) => void;
  activityId: number;
}

const ActivityForm = ({
  activityId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActivityFormProps) => {
  const [activity, setActivity] = useState<ICreateActivity>({
    name: "",
    location: "",
    releaseTime: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = activityId !== 0;

  const fetchActivityData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ActivityService.getActivityById(activityId);
        setActivity(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hoạt động:", error);
        toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, activityId]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  const handleInputChange = (field: string, value: string) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (activity.name === "") {
      toast.error("Vui lòng nhập tên hoạt động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ActivityService.updateActivity(activityId, activity)
      : ActivityService.createActivity(activity);

    savePromise
      .then((newActivity) => {
        const newActivityId = newActivity?.id || 0;
        toast.success("Hoạt động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newActivityId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu hoạt động!");
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
            {isEditing ? "Chỉnh sửa hoạt động" : "Thêm hoạt động mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên hoạt động"
                variant="outlined"
                value={activity.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa điểm"
                variant="outlined"
                value={activity.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={activity.description}
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

export default ActivityForm;
