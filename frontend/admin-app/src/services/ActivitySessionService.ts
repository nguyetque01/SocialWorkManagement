import httpModule from "../helpers/http.module";
import { ApiResponse } from "../types/global.typing";
import {
  ICreateActivitySession,
  IActivitySession,
  IActivitySessionDetail,
} from "../types/activity-session.typing";

const API_ENDPOINT = "/ActivitySessions";

const ActivitySessionService = {
  getAllActivitySessions: async (): Promise<IActivitySession[]> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivitySession[]>>(
        API_ENDPOINT
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch ActivitySessions");
    }
  },

  getAllActivitySessionDetails: async (): Promise<IActivitySessionDetail[]> => {
    try {
      const response = await httpModule.get<
        ApiResponse<IActivitySessionDetail[]>
      >(`${API_ENDPOINT}/details`);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch ActivitySessions");
    }
  },

  getActivitySessionById: async (
    ActivitySessionId: number
  ): Promise<IActivitySession> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivitySession>>(
        `${API_ENDPOINT}/${ActivitySessionId}`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch ActivitySession");
    }
  },

  createActivitySession: async (
    ActivitySessionData: ICreateActivitySession
  ): Promise<IActivitySession> => {
    try {
      const response = await httpModule.post<ApiResponse<IActivitySession>>(
        API_ENDPOINT,
        ActivitySessionData
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to create ActivitySession");
    }
  },

  updateActivitySession: async (
    ActivitySessionId: number,
    ActivitySessionData: ICreateActivitySession
  ): Promise<void> => {
    try {
      const response = await httpModule.put<ApiResponse<any>>(
        `${API_ENDPOINT}/${ActivitySessionId}`,
        ActivitySessionData
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to update ActivitySession");
    }
  },

  deleteActivitySession: async (ActivitySessionId: number): Promise<void> => {
    try {
      const response = await httpModule.delete<ApiResponse<any>>(
        `${API_ENDPOINT}/${ActivitySessionId}`
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to delete ActivitySession");
    }
  },
};

export default ActivitySessionService;
