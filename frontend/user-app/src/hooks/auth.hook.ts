import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  return authContext;
};

export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

export const useCurrentUserId = () => {
  const user = useCurrentUser();
  return user?.id;
};
