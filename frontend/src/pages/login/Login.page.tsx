import { Box, Typography } from "@mui/material";
import LoginForm from "../../components/login/LoginForm.component";
import { imagePaths } from "../../constants/imagePaths.contants";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import "./login-page.scss";
import { IAuthRequest } from "../../types/global.typing";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import UserService from "../../services/UserService";

const Login = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { login } = authContext;

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      if ("token" in response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        const userData = await UserService.getUserById(parseInt(response.id));
        login(userData);
        // window.location.href = "/";
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
