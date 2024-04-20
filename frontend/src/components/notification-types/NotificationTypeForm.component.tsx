import React, { useEffect, useState } from "react";
import { ICreateNotificationType } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import NotificationTypeService from "../../services/NotificationTypeService";
import "../../styles/form.scss";

interface INotificationTypeFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newNotificationType: number) => void;
  NotificationTypeId: number;
}

const NotificationTypeForm = ({
  NotificationTypeId,
  onSaveSuccess,
  handleClickCancelBtn,
}: INotificationTypeFormProps) => {
  const [NotificationType, setNotificationType] =
    useState<ICreateNotificationType>({
      name: "",
      status: 0,
      description: "",
    });

  const [loading, setLoading] = useState(false);
  const isEditing = NotificationTypeId !== 0;

  useEffect(() => {
    fetchNotificationTypeData();
  }, [NotificationTypeId]);

  const fetchNotificationTypeData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await NotificationTypeService.getNotificationTypeById(
          NotificationTypeId
        );
        setNotificationType(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu loại thông báo:", error);
        toast.error("Lỗi khi tải dữ liệu loại thông báo. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNotificationType((prevNotificationType) => ({
      ...prevNotificationType,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (NotificationType.name === "") {
      toast.error("Vui lòng nhập tên loại thông báo!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? NotificationTypeService.updateNotificationType(
          NotificationTypeId,
          NotificationType
        )
      : NotificationTypeService.createNotificationType(NotificationType);

    savePromise
      .then((newNotificationType) => {
        const newNotificationTypeId = newNotificationType?.id || 0;
        toast.success("Loại thông báo đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newNotificationTypeId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu loại thông báo!");
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
            {isEditing ? "Chỉnh sửa loại thông báo" : "Thêm loại thông báo mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên loại thông báo"
                variant="outlined"
                value={NotificationType.name}
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
                value={NotificationType.description}
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

export default NotificationTypeForm;
