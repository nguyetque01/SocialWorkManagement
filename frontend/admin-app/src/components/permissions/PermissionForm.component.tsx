import React, { useEffect, useState } from "react";
import { ICreatePermission } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import PermissionService from "../../services/PermissionService";
import "../../styles/form.scss";

interface IPermissionFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newPermission: number) => void;
  PermissionId: number;
}

const PermissionForm = ({
  PermissionId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IPermissionFormProps) => {
  const [Permission, setPermission] = useState<ICreatePermission>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = PermissionId !== 0;

  useEffect(() => {
    fetchPermissionData();
  }, [PermissionId]);

  const fetchPermissionData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await PermissionService.getPermissionById(PermissionId);
        setPermission(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quyền hạn:", error);
        toast.error("Lỗi khi tải dữ liệu quyền hạn. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPermission((prevPermission) => ({
      ...prevPermission,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (Permission.name === "") {
      toast.error("Vui lòng nhập tên quyền hạn!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? PermissionService.updatePermission(PermissionId, Permission)
      : PermissionService.createPermission(Permission);

    savePromise
      .then((newPermission) => {
        const newPermissionId = newPermission?.id || 0;
        toast.success("quyền hạn đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newPermissionId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu quyền hạn!");
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
            {isEditing ? "Chỉnh sửa quyền hạn" : "Thêm quyền hạn mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên quyền hạn"
                variant="outlined"
                value={Permission.name}
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
                value={Permission.description}
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

export default PermissionForm;
