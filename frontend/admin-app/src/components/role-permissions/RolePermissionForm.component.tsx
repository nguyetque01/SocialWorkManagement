import React, { useEffect, useState } from "react";
import {
  ICreateRolePermission,
  IPermission,
  IRole,
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import RolePermissionService from "../../services/RolePermissionService";
import "../../styles/form.scss";

interface IRolePermissionFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newRolePermission: number) => void;
  RolePermissionId: number;
  roles: IRole[];
  permissions: IPermission[];
}

const RolePermissionForm = ({
  RolePermissionId,
  roles,
  permissions,
  onSaveSuccess,
  handleClickCancelBtn,
}: IRolePermissionFormProps) => {
  const [RolePermission, setRolePermission] = useState<ICreateRolePermission>({
    roleId: 0,
    permissionId: 0,
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = RolePermissionId !== 0;

  useEffect(() => {
    fetchRolePermissionData();
  }, [RolePermissionId]);

  const fetchRolePermissionData = async () => {
    if (isEditing) {
      try {
        const data = await RolePermissionService.getRolePermissionById(
          RolePermissionId
        );
        setRolePermission(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu phân quyền:", error);
        toast.error("Lỗi khi tải dữ liệu phân quyền. Vui lòng thử lại!");
      }
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setRolePermission((prevRolePermission) => ({
      ...prevRolePermission,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    setLoading(true);

    const savePromise = isEditing
      ? RolePermissionService.updateRolePermission(
          RolePermissionId,
          RolePermission
        )
      : RolePermissionService.createRolePermission(RolePermission);

    savePromise
      .then((newRolePermission) => {
        const newRolePermissionId = newRolePermission?.id || 0;
        toast.success("phân quyền đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newRolePermissionId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu phân quyền!");
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
            {isEditing ? "Chỉnh sửa phân quyền" : "Thêm phân quyền mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="role-select-label">Vai trò</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={RolePermission.roleId}
                  onChange={(e) =>
                    handleInputChange("roleId", e.target.value as number)
                  }
                  label="Vai trò"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Typography variant="subtitle1">Quyền hạn</Typography>
                {permissions.map((permission) => (
                  <FormControlLabel
                    key={permission.id}
                    control={
                      <Checkbox
                        checked={RolePermission.permissionId === permission.id}
                        onChange={(e) =>
                          handleInputChange(
                            "permissionId",
                            e.target.checked ? permission.id : 0
                          )
                        }
                      />
                    }
                    label={permission.name}
                  />
                ))}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={RolePermission.description}
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

export default RolePermissionForm;
