import httpModule from "../helpers/http.module";
import { ApiResponse } from "../types/global.typing";
import { ICreateUser, IUser, IUserDetail } from "../types/user.typing";

const API_ENDPOINT = "/Users";

const UserService = {
  getAllUsers: async (): Promise<IUser[]> => {
    try {
      const response = await httpModule.get<ApiResponse<IUser[]>>(API_ENDPOINT);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Users");
    }
  },

  getAllUserDetails: async (): Promise<IUserDetail[]> => {
    try {
      const response = await httpModule.get<ApiResponse<IUserDetail[]>>(
        `${API_ENDPOINT}/details`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Users");
    }
  },

  getUserById: async (userId: number): Promise<IUser> => {
    try {
      const response = await httpModule.get<ApiResponse<IUser>>(
        `${API_ENDPOINT}/${userId}`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  createUser: async (userData: ICreateUser): Promise<IUser> => {
    try {
      const response = await httpModule.post<ApiResponse<IUser>>(
        API_ENDPOINT,
        userData
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to create user");
    }
  },

  updateUser: async (userId: number, userData: ICreateUser): Promise<void> => {
    try {
      const response = await httpModule.put<ApiResponse<any>>(
        `${API_ENDPOINT}/${userId}`,
        userData
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to update user");
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      const response = await httpModule.delete<ApiResponse<any>>(
        `${API_ENDPOINT}/${userId}`
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  },
};

export default UserService;
