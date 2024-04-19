import React, { useEffect, useState } from "react";
import { ICreateRole } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import RoleService from "../../services/RoleService";
import "../../styles/form.scss";

interface IRoleFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newRole: number) => void;
  RoleId: number;
}

const RoleForm = ({
  RoleId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IRoleFormProps) => {
  const [Role, setRole] = useState<ICreateRole>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = RoleId !== 0;

  useEffect(() => {
    fetchRoleData();
  }, [RoleId]);

  const fetchRoleData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await RoleService.getRoleById(RoleId);
        setRole(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu vai trò:", error);
        toast.error("Lỗi khi tải dữ liệu vai trò. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setRole((prevRole) => ({
      ...prevRole,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (Role.name === "") {
      toast.error("Vui lòng nhập tên vai trò!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? RoleService.updateRole(RoleId, Role)
      : RoleService.createRole(Role);

    savePromise
      .then((newRole) => {
        const newRoleId = newRole?.id || 0;
        toast.success("vai trò đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newRoleId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu vai trò!");
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
            {isEditing ? "Chỉnh sửa vai trò" : "Thêm vai trò mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên vai trò"
                variant="outlined"
                value={Role.name}
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
                value={Role.description}
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

export default RoleForm;
