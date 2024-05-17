import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/AuthService";
import { IUser } from "../types/global.typing";

interface IAuthContextInterface {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
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

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getAccount();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = (userData: IUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value: IAuthContextInterface = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
