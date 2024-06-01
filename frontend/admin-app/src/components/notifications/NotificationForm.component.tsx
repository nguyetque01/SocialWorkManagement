import React, { useCallback, useEffect, useState } from "react";
import {
  ICreateNotification,
  INotificationType,
} from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import NotificationService from "../../services/NotificationService";
import "../../styles/form.scss";

interface INotificationFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newNotification: number) => void;
  notificationId: number;
  notificationTypes: INotificationType[];
}

const NotificationForm = ({
  notificationId,
  notificationTypes,
  onSaveSuccess,
  handleClickCancelBtn,
}: INotificationFormProps) => {
  const [Notification, setNotification] = useState<ICreateNotification>({
    title: "",
    content: "",
    typeId: notificationTypes.length > 0 ? notificationTypes[0].id : 0,
    // sentTo: 0,
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = notificationId !== 0;

  const fetchNotificationData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await NotificationService.getNotificationById(
          notificationId
        );
        setNotification(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thông báo:", error);
        toast.error("Lỗi khi tải dữ liệu thông báo. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, notificationId]);

  useEffect(() => {
    fetchNotificationData();
  }, [fetchNotificationData]);

  const handleInputChange = (field: string, value: string | number) => {
    setNotification((prevNotification) => ({
      ...prevNotification,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    setLoading(true);

    const savePromise = isEditing
      ? NotificationService.updateNotification(notificationId, Notification)
      : NotificationService.createNotification(Notification);

    savePromise
      .then((newNotification) => {
        const newnotificationId = newNotification?.id || 0;
        toast.success("thông báo đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newnotificationId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu thông báo!");
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
            {isEditing ? "Chỉnh sửa thông báo" : "Thêm thông báo mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiêu đề thông báo"
                variant="outlined"
                value={Notification.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nội dung thông báo"
                variant="outlined"
                value={Notification.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="type-select-label">Loại thông báo</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={Notification.typeId}
                  onChange={(e) =>
                    handleInputChange("typeId", e.target.value as number)
                  }
                  label="Loại thông báo"
                >
                  {notificationTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={Notification.description}
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

export default NotificationForm;
