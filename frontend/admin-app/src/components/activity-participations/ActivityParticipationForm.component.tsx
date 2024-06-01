import { useCallback, useEffect, useState } from "react";
import { ICreateActivityParticipation } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivityParticipationService from "../../services/ActivityParticipationService";
import "../../styles/form.scss";

interface IActivityParticipationFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newActivityParticipation: number) => void;
  activityParticipationId: number;
}

const ActivityParticipationForm = ({
  activityParticipationId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActivityParticipationFormProps) => {
  const [activityParticipation, setActivityParticipation] =
    useState<ICreateActivityParticipation>({
      // có sửa lại ở đây
      // activitySessionId: undefined,
      status: 0,
      description: "",
    });

  const [loading, setLoading] = useState(false);
  const isEditing = activityParticipationId !== 0;

  const fetchActivityParticipationData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data =
          await ActivityParticipationService.getActivityParticipationById(
            activityParticipationId
          );
        setActivityParticipation(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hoạt động tham gia:", error);
        toast.error(
          "Lỗi khi tải dữ liệu hoạt động tham gia. Vui lòng thử lại!"
        );
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, activityParticipationId]);

  useEffect(() => {
    fetchActivityParticipationData();
  }, [fetchActivityParticipationData]);

  const handleInputChange = (field: string, value: string) => {
    setActivityParticipation((prevActivityParticipation) => ({
      ...prevActivityParticipation,
      [field]: value,
    }));
  };

  // có sửa lại ở đây
  const handleClickSaveBtn = () => {
    // if (activityParticipation.activitySessionId) {
    //   toast.error("Vui lòng nhập id phiên hoạt động tham gia!");
    //   return;
    // }

    setLoading(true);

    const savePromise = isEditing
      ? ActivityParticipationService.updateActivityParticipation(
          activityParticipationId,
          activityParticipation
        )
      : ActivityParticipationService.createActivityParticipation(
          activityParticipation
        );

    savePromise
      .then((newActivityParticipation) => {
        const newActivityParticipationId = newActivityParticipation?.id || 0;
        toast.success("hoạt động tham gia đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newActivityParticipationId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu hoạt động tham gia!");
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
            {isEditing
              ? "Chỉnh sửa hoạt động tham gia"
              : "Thêm hoạt động tham gia mới"}
          </Typography>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Id phiên hoạt động"
                variant="outlined"
                value={activityParticipation.activitySessionId}// có sửa lại ở đây
                onChange={(e) => handleInputChange("activitySessionId", e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={activityParticipation.description}
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

export default ActivityParticipationForm;
