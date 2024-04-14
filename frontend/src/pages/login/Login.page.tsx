import { Box, Typography } from "@mui/material";
import LoginForm from "../../components/login/LoginForm.component";
import { imagePaths } from "../../constants/imagePaths.contants";
import "./login-page.scss";

const Login = () => {
  return (
    <Box
      className="login-page"
      style={{ backgroundImage: `url(${imagePaths.BG_DNTU})` }}
    >
      <Box className="login-box">
        <Box className="tiltle">
          <Typography className="app-name">
            Hệ Thống Quản Lý Công Tác Xã Hội
          </Typography>
          <Typography className="school-name">
            Trường Đại Học Công Nghệ Đồng Nai
          </Typography>
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
