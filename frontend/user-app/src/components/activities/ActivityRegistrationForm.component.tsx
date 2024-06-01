import { useEffect, useState, useCallback } from "react";
import { ICreateActivity } from "../../types/activity.typing";
import { Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { toast } from "react-toastify";
import ActivityService from "../../services/ActivityService";
import "../../styles/form.scss";

interface IActivityRegistrationFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newActivityId: number) => void;
  activityId: number;
}

const ActivityRegistrationForm = ({
  activityId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActivityRegistrationFormProps) => {
  const [activity, setActivity] = useState<ICreateActivity>({
    name: "",
    location: "",
    releaseTime: null,
    description: "",
  });

  const fetchActivityData = useCallback(async () => {
    try {
      const data = await ActivityService.getActivityById(activityId);
      setActivity(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu hoạt động:", error);
      toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
    } finally {
    }
  }, [activityId]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  const handleInputChange = (field: string, value: string) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {};

  return (
    <Paper elevation={3} className="form">
      <Typography variant="h5" gutterBottom>
        Đăng ký hoạt động
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tên hoạt động"
            variant="outlined"
            value={activity.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa điểm"
            variant="outlined"
            value={activity.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            disabled
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
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled
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
          Đăng ký
        </Button>
      </div>
    </Paper>
  );
};

export default ActivityRegistrationForm;
