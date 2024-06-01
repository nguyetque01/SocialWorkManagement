import httpModule from "../helpers/http.module";
import { IActivitySession, ICreateActivitySession } from "../types/global.typing";

const API_ENDPOINT = "/activitySessions";

const ActivitySessionService = {
  getAllactivitySessions: async (): Promise<IActivitySession[]> => {
    try {
      const response = await httpModule.get<IActivitySession[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity sessions");
    }
  },

  getActivitySessionById: async (ActivitySessionId: number): Promise<IActivitySession> => {
    try {
      const response = await httpModule.get<IActivitySession>(
        `${API_ENDPOINT}/${ActivitySessionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity session");
    }
  },

  createActivitySession: async (ActivitySessionData: ICreateActivitySession): Promise<IActivitySession> => {
    try {
      const response = await httpModule.post<IActivitySession>(
        API_ENDPOINT,
        ActivitySessionData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create activity session");
    }
  },

  updateActivitySession: async (
    ActivitySessionId: number,
    ActivitySessionData: ICreateActivitySession
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${ActivitySessionId}`, ActivitySessionData);
    } catch (error) {
      throw new Error("Failed to update activity session");
    }
  },

  deleteActivitySession: async (ActivitySessionId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${ActivitySessionId}`);
    } catch (error) {
      throw new Error("Failed to delete activity session");
    }
  },
};

export default ActivitySessionService;
