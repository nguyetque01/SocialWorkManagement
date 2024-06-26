import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress, Typography } from "@mui/material";
import { imagePaths } from "../../constants/imagePaths.contants";
import { AuthContext } from "../../context/auth.context";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import LoginForm from "../../components/login/LoginForm.component";
import "./login-page.scss";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { login } = authContext;

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const response = await AuthService.login(email, password);
      if ("token" in response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        const userData = await UserService.getUserById(parseInt(response.id));
        login(userData);
      } else {
        console.error(response.message);
        toast.error("Email hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error);
      toast.error("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
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
        {loading ? (
          <CircularProgress size={100} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </Box>
    </Box>
  );
};

export default Login;
