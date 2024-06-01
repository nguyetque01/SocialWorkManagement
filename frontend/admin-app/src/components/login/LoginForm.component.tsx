import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import "../../styles/form.scss";
import "./login-form.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IAuthRequest } from "../../types/auth.typing";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [user, setUser] = useState<IAuthRequest>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (field: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const handleKeyDown = (event: React.KeyboardEvent): any => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (!user.email) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (!user.password) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }
    onLogin(user.email, user.password);
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
            value={user.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              onKeyDown={handleKeyDown}
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
      </Grid>
      <Button className="login-btn" variant="contained" onClick={handleLogin}>
        Đăng nhập
      </Button>
      <Box className="actions">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Nhớ tài khoản" />
        </FormGroup>
        <Link to="/forget-password" className="link">
          Quên mật khẩu?
        </Link>
      </Box>
    </Paper>
  );
};

export default LoginForm;
