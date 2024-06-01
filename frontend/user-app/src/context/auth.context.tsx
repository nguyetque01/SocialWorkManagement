import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import AuthService from "../services/AuthService";
import { IUser } from "../types/global.typing";

interface IAuthContextInterface {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContextInterface | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const currentUser = await AuthService.getAccount();
      setUser(currentUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = (userData: IUser) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const value: IAuthContextInterface = {
    user,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
