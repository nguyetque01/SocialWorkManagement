import React, { useCallback, useEffect, useState } from "react";
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
  permissionId: number;
}

const PermissionForm = ({
  permissionId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IPermissionFormProps) => {
  const [permission, setPermission] = useState<ICreatePermission>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = permissionId !== 0;

  const fetchPermissionData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await PermissionService.getPermissionById(permissionId);
        setPermission(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu quyền hạn:", error);
        toast.error("Lỗi khi tải dữ liệu quyền hạn. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, permissionId]);

  useEffect(() => {
    fetchPermissionData();
  }, [fetchPermissionData]);

  const handleInputChange = (field: string, value: string) => {
    setPermission((prevPermission) => ({
      ...prevPermission,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (permission.name === "") {
      toast.error("Vui lòng nhập tên quyền hạn!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? PermissionService.updatePermission(permissionId, permission)
      : PermissionService.createPermission(permission);

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
                value={permission.name}
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
                value={permission.description}
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
