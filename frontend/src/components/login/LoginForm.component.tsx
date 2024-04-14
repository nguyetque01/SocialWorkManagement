import { useEffect, useState } from "react";
import { ILoginUser } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import UserService from "../../services/UserService";
import "../../styles/form.scss";
import "./login-form.scss";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [User, setUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = async () => {
    // if (isEditing) {
    //   try {
    //     // setLoading(true);
    //     const data = await UserService.getUserById(UserId);
    //     setUser(data);
    //   } catch (error) {
    //     console.error("Lỗi khi tải dữ liệu hoạt động:", error);
    //     toast.error("Lỗi khi tải dữ liệu hoạt động. Vui lòng thử lại!");
    //   } finally {
    //     // setLoading(false);
    //   }
    // }
  };

  const handleInputChange = (field: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <Paper elevation={3} className="form login-form">
      <Typography variant="h5" gutterBottom>
        Đăng nhập
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={User.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Mật khẩu"
            variant="outlined"
            value={User.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        className="login-btn"
        variant="contained"
        //   onClick={handleClickSaveBtn}
      >
        Đăng nhập
      </Button>
      <Box className="actions">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Ghi nhớ mật khẩu" />
        </FormGroup>
        <Link to={"/forget-password"}>Quên mật khẩu?</Link>
      </Box>
    </Paper>
  );
};

export default LoginForm;
