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

  createUser: async (UserData: ICreateUser): Promise<IUser> => {
    try {
      const response = await httpModule.post<IUser>(API_ENDPOINT, UserData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  },

  updateUser: async (userId: number, UserData: ICreateUser): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${userId}`, UserData);
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${userId}`);
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
};

export default UserService;
