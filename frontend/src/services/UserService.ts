import httpModule from "../helpers/http.module";
import { IUser } from "../types/global.typing";

const API_ENDPOINT = "/RecordHistories";

const UserService = {
  getAllRecordHistories: async (): Promise<IUser[]> => {
    try {
      const response = await httpModule.get<IUser[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch record histories");
    }
  },

  getUserById: async (UserId: string): Promise<IUser> => {
    try {
      const response = await httpModule.get<IUser>(`${API_ENDPOINT}/${UserId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch record history");
    }
  },
};

export default UserService;
