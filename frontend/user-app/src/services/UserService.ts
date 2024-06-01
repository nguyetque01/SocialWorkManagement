import httpModule from "../helpers/http.module";
import { IUser, ICreateUser } from "../types/global.typing";

const API_ENDPOINT = "/Users";

const UserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    try {
      const response = await httpModule.get<IUser[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Users");
    }
  },

  getUserById: async (userId: number): Promise<IUser> => {
    try {
      const response = await httpModule.get<IUser>(`${API_ENDPOINT}/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  updateUser: async (userId: number, UserData: ICreateUser): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${userId}`, UserData);
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },
};

export default UserService;
