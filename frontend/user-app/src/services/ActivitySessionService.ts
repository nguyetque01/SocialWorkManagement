import httpModule from "../helpers/http.module";
import { ApiResponse } from "../types/global.typing";
import {
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
      throw new Error("Failed to fetch Activity Sessions");
    }
  },

  getActivitySessionDetailsByActivityId: async (
    activityId: number
  ): Promise<IActivitySessionDetail[]> => {
    try {
      const response = await httpModule.get<
        ApiResponse<IActivitySessionDetail[]>
      >(`${API_ENDPOINT}/details/activity/${activityId}`);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Activity Sessions");
    }
  },

  getActivitySessionById: async (
    activitySessionId: number
  ): Promise<IActivitySession> => {
    try {
      const response = await httpModule.get<ApiResponse<IActivitySession>>(
        `${API_ENDPOINT}/${activitySessionId}`
      );
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch Activity Session");
    }
  },
};

export default ActivitySessionService;
