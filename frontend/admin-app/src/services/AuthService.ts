import httpModule from "../helpers/http.module";
import { IAuthResponse, IUser } from "../types/global.typing";

const API_ENDPOINT = "/Auth";

const AuthService = {
  login: async (
    email: string,
    password: string
  ): Promise<IAuthResponse | { success: boolean; message: string }> => {
    try {
      const response = await httpModule.post<IAuthResponse>(
        `${API_ENDPOINT}/login`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data };
      } else {
        throw new Error("Failed to login");
      }
    }
  },

  getAccount: async (): Promise<IUser> => {
    try {
      const response = await httpModule.get(`${API_ENDPOINT}/account`);
      return response.data;
    } catch (error: any) {
      throw new Error("Failed to fetch current user");
    }
  },

  logout: async (): Promise<any> => {
    try {
      const response = await httpModule.post(`${API_ENDPOINT}/logout`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data };
      } else {
        throw new Error("Failed to logout");
      }
    }
  },
};

export default AuthService;
