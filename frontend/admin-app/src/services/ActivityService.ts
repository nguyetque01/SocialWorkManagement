import httpModule from "../helpers/http.module";
import { ApiResponse } from "../types/global.typing";
import {
  ICreateActivity,
  IActivity,
  IActivityDetail,
} from "../types/activity.typing";

const API_ENDPOINT = "/Activities";

const Activitieservice = {
  getAllActivities: async (): Promise<IActivity[]> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivity[]>>(
        API_ENDPOINT
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Activities");
    }
  },

  getAllActivityDetails: async (): Promise<IActivityDetail[]> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivityDetail[]>>(
        `${API_ENDPOINT}/details`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Activities");
    }
  },

  getActivityById: async (ActivityId: number): Promise<IActivity> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivity>>(
        `${API_ENDPOINT}/${ActivityId}`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Activity");
    }
  },

  createActivity: async (ActivityData: ICreateActivity): Promise<IActivity> => {
    try {
      const response = await httpModule.post<ApiResponse<IActivity>>(
        API_ENDPOINT,
        ActivityData
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to create Activity");
    }
  },

  updateActivity: async (
    ActivityId: number,
    ActivityData: ICreateActivity
  ): Promise<void> => {
    try {
      const response = await httpModule.put<ApiResponse<any>>(
        `${API_ENDPOINT}/${ActivityId}`,
        ActivityData
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to update Activity");
    }
  },

  deleteActivity: async (ActivityId: number): Promise<void> => {
    try {
      const response = await httpModule.delete<ApiResponse<any>>(
        `${API_ENDPOINT}/${ActivityId}`
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to delete Activity");
    }
  },
};

export default Activitieservice;
