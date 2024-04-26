import React, { useEffect, useState } from "react";
import { ICreateUser } from "../../types/global.typing";
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
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import "../../styles/form.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IUserFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newUser: number) => void;
  userId: number;
}

const UserForm = ({
  userId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IUserFormProps) => {
  const [User, setUser] = useState<ICreateUser>({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phoneNumber: "",
    // roleId: 0,
    // facultyId: 0,
    // classId: 0,
    // status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = userId !== 0;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    if (isEditing) {
      try {
        const data = await UserService.getUserById(userId);
        setUser(data);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu người dùng.");
      }
    }
  };

  const handleInputChange = (field: string, value: string | null) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (User.fullName === "") {
      toast.error("Vui lòng nhập tên người dùng.");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? UserService.updateUser(userId, User)
      : UserService.createUser(User);

    savePromise
      .then((newUser) => {
        onSaveSuccess(newUser?.id || 0);
        toast.success("Người dùng đã được lưu thành công!");
      })
      .catch(() => {
        toast.error("Đã xảy ra lỗi khi lưu người dùng.");
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
            {isEditing ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên người dùng"
                variant="outlined"
                value={User.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={User.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={User.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Mật khẩu"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                value={User.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ngày sinh"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={User.dateOfBirth}
                onChange={(e) =>
                  handleInputChange("dateOfBirth", e.target.value)
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="gender-select-label">Giới tính</InputLabel>
                <Select
                  labelId="gender-select-label"
                  value={User.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  label="Giới tính"
                >
                  <MenuItem value="Male">Nam</MenuItem>
                  <MenuItem value="Female">Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                variant="outlined"
                value={User.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Mô tả"
                variant="outlined"
                value={User.description}
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

export default UserForm;
