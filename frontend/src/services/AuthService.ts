import httpModule from "../helpers/http.module";
import { IAuthRequest } from "../types/global.typing";

const API_ENDPOINT = "/Auth";

const AuthService = {
  login: async (email: string, password: string): Promise<any> => {
    try {
      const response = await httpModule.post(`${API_ENDPOINT}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return { success: false, message: error.response.data };
      } else {
        throw new Error("Failed to login");
      }
    }
  },
};

export default AuthService;
