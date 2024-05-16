import { Navigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LoginForm from "../../components/login/LoginForm.component";
import { imagePaths } from "../../constants/imagePaths.contants";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import "./login-page.scss";

const Login = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        console.log(response);

        <Navigate to="/" />;
        window.location.reload();
      } else {
        console.error(response.message);
        toast.error("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error);
      toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    }
  };

  return (
    <Box
      className="login-page"
      style={{ backgroundImage: `url(${imagePaths.BG_DNTU})` }}
    >
      <Box className="login-box">
        <Box className="title">
          <Typography
            variant="h4"
            className="app-name"
            sx={{ textAlign: "center" }}
          >
            Hệ Thống Quản Lý Công Tác Xã Hội
          </Typography>
          <Typography
            variant="h6"
            className="school-name"
            sx={{ textAlign: "center" }}
          >
            Trường Đại Học Công Nghệ Đồng Nai
          </Typography>
        </Box>
        <LoginForm onLogin={handleLogin} />
      </Box>
    </Box>
  );
};

export default Login;
