import React, { useEffect, useState } from "react";
import { ICreateActionType } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActionTypeService from "../../services/ActionTypeService";
import "../../styles/form.scss";

interface IActionTypeFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: () => void;
  ActionTypeId: string;
}

const ActionTypeForm = ({
  ActionTypeId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActionTypeFormProps) => {
  const [ActionType, setActionType] = useState<ICreateActionType>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = ActionTypeId !== "0";

  useEffect(() => {
    fetchActionTypeData();
  }, [ActionTypeId]);

  const fetchActionTypeData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ActionTypeService.getActionTypeById(ActionTypeId);
        setActionType(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu loại hành động:", error);
        toast.error("Lỗi khi tải dữ liệu loại hành động. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setActionType((prevActionType) => ({
      ...prevActionType,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (ActionType.name === "") {
      toast.error("Vui lòng nhập tên loại hành động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ActionTypeService.updateActionType(ActionTypeId, ActionType)
      : ActionTypeService.createActionType(ActionType);

    savePromise
      .then(() => {
        toast.success("loại hành động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu loại hành động!");
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
            {isEditing ? "Chỉnh sửa loại hành động" : "Thêm loại hành động mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên loại hành động"
                variant="outlined"
                value={ActionType.name}
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
                value={ActionType.description}
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

export default ActionTypeForm;
