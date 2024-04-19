import React, { useEffect, useState } from "react";
import { ICreateUser } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import "../../styles/form.scss";

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
    roleId: 0,
    facultyId: 0,
    classId: 0,
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = userId !== 0;

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await UserService.getUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        toast.error("Lỗi khi tải dữ liệu người dùng. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (User.fullName === "") {
      toast.error("Vui lòng nhập tên người dùng!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? UserService.updateUser(userId, User)
      : UserService.createUser(User);

    savePromise
      .then((newUser) => {
        const newUserId = newUser?.id || 0;
        toast.success("Người dùng đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newUserId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu người dùng!");
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên người dùng"
                variant="outlined"
                value={User.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
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
