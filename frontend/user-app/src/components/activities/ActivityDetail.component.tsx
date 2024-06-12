import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivityService from "../../services/ActivityService";
import { IActivityDetail } from "../../types/activity.typing";
import "../../styles/detail.scss";

interface IActivityDetailProps {
  handleClickCancelBtn: () => void;
  activityId: number;
}

const ActivityDetail = ({
  activityId,
  handleClickCancelBtn,
}: IActivityDetailProps) => {
  const [activity, setActivity] = useState<IActivityDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchActivityData = useCallback(async () => {
    try {
      setLoading(true);

      const data = await ActivityService.getActivityDetailById(activityId);
      setActivity(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu hoạt động:", error);
      toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }, [activityId]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  return (
    <Paper elevation={3} className="detail-wrapped">
      <Typography variant="h5" gutterBottom>
        Chi tiết hoạt động
      </Typography>
      <Divider />

      {loading ? (
        <div className="center">
          <CircularProgress size={100} />
        </div>
      ) : !activity ? (
        <div className="center">
          <h3>Không lấy được chi tiết hoạt động.</h3>
        </div>
      ) : (
        <>
          <Grid container spacing={2} className="detail-container">
            <Grid item xs={12}>
              <Typography variant="h6">{activity.name}</Typography>
              <Chip
                label={activity.activityCategory || "Không có thông tin"}
                avatar={
                  <Avatar>
                    {activity.activityCategory
                      ? activity.activityCategory[0]
                      : "N/A"}
                  </Avatar>
                }
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
              <Chip
                label={activity.academicYear || "Không có thông tin"}
                color="secondary"
                variant="outlined"
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>ID:</strong> {activity.id}
              </Typography>
              <Typography variant="body1">
                <strong>Địa điểm:</strong>{" "}
                {activity.location || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian phát hành:</strong>{" "}
                {activity.releaseTime
                  ? new Date(activity.releaseTime).toLocaleString()
                  : "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Mô tả:</strong>{" "}
                {activity.description || "Không có thông tin"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Trạng thái:</strong>{" "}
                {activity.statusText || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Tổng số ngày:</strong>{" "}
                {activity.totalDays || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày bắt đầu hoạt động:</strong>{" "}
                {activity.activityStartDate
                  ? new Date(activity.activityStartDate).toLocaleDateString()
                  : "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Ngày kết thúc hoạt động:</strong>{" "}
                {activity.activityEndDate
                  ? new Date(activity.activityEndDate).toLocaleDateString()
                  : "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian bắt đầu đăng ký:</strong>{" "}
                {activity.registrationStartTime
                  ? new Date(activity.registrationStartTime).toLocaleString()
                  : "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian kết thúc đăng ký:</strong>{" "}
                {activity.registrationEndTime
                  ? new Date(activity.registrationEndTime).toLocaleString()
                  : "Không có thông tin"}
              </Typography>
            </Grid>
          </Grid>
          <Divider className="divider-margin" />

          <div className="btns">
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={handleClickCancelBtn}
            >
              OK
            </Button>
          </div>
        </>
      )}
    </Paper>
  );
};

export default ActivityDetail;
