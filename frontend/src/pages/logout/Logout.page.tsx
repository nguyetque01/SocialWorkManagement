import { useEffect, useContext } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/auth.context";

const LogoutPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { logout } = authContext;

  useEffect(() => {
    const performLogout = async () => {
      try {
        await AuthService.logout();
        localStorage.clear();
        logout();
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to logout:", error);
      }
    };

    performLogout();
  }, []);

  return null;
};

export default LogoutPage;
