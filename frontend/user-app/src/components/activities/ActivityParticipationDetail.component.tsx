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
import ActivityParticipationService from "../../services/ActivityParticipationService";
import { IActivityParticipationDetail } from "../../types/activity-participation.typing";
import "../../styles/detail.scss";

interface IActivityParticipationDetailProps {
  handleClickCancelBtn: () => void;
  activityParticipationId: number;
}

const ActivityParticipationDetail = ({
  activityParticipationId,
  handleClickCancelBtn,
}: IActivityParticipationDetailProps) => {
  const [activityParticipation, setActivityParticipation] =
    useState<IActivityParticipationDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchActivityParticipationData = useCallback(async () => {
    try {
      setLoading(true);
      const data =
        await ActivityParticipationService.getActivityParticipationDetailsById(
          activityParticipationId
        );
      setActivityParticipation(data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu hoạt động:", error);
      toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }, [activityParticipationId]);

  useEffect(() => {
    fetchActivityParticipationData();
  }, [fetchActivityParticipationData]);

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
      ) : !activityParticipation ? (
        <div className="center">
          <h3>Không lấy được chi tiết hoạt động.</h3>
        </div>
      ) : (
        <>
          <Grid container spacing={2} className="detail-container">
            <Grid item xs={12}>
              <Typography variant="h6">
                {activityParticipation.activityName}
              </Typography>
              <Chip
                label={activityParticipation.session || "Không có thông tin"}
                avatar={
                  <Avatar>
                    {activityParticipation.session
                      ? activityParticipation.session[0]
                      : "N/A"}
                  </Avatar>
                }
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>ID: </strong> {activityParticipation.id}
              </Typography>
              <Typography variant="body1">
                <strong>ID sinh viên: </strong>
                {activityParticipation.studentId || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Tên sinh tên: </strong>
                {activityParticipation.studentName || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian bắt đầu: </strong>
                {activityParticipation.startTime
                  ? new Date(activityParticipation.startTime).toLocaleString()
                  : "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Thời gian kết thúc: </strong>
                {activityParticipation.endTime
                  ? new Date(activityParticipation.endTime).toLocaleString()
                  : "Không có thông tin"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Số ngày: </strong>
                {activityParticipation.daysCount || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Trạng thái: </strong>
                {activityParticipation.statusText || "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Trạng thái đăng ký: </strong>
                {activityParticipation.registrationStatusText ||
                  "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Trạng thái điểm danh: </strong>
                {activityParticipation.attendanceStatusText ||
                  "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Trạng thái phê duyệt điểm danh: </strong>
                {activityParticipation.approvalAttendanceStatusText ||
                  "Không có thông tin"}
              </Typography>
              <Typography variant="body1">
                <strong>Mô tả: </strong>
                {activityParticipation.description || "Không có mô tả"}
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
              Hủy
            </Button>
          </div>
        </>
      )}
    </Paper>
  );
};

export default ActivityParticipationDetail;
