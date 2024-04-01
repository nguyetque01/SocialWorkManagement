import httpModule from "../helpers/http.module";
import { IActivity, ICreateActivity } from "../types/global.typing";

const API_ENDPOINT = "/Activities";

const ActivityService = {
  getAllActivities: async (): Promise<IActivity[]> => {
    try {
      const response = await httpModule.get<IActivity[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activities");
    }
  },

  getActivityById: async (activityId: string): Promise<IActivity> => {
    try {
      const response = await httpModule.get<IActivity>(
        `${API_ENDPOINT}/${activityId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity");
    }
  },

  createActivity: async (activityData: ICreateActivity): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, activityData);
    } catch (error) {
      throw new Error("Failed to create activity");
    }
  },

  updateActivity: async (
    activityId: string,
    activityData: ICreateActivity
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${activityId}`, activityData);
    } catch (error) {
      throw new Error("Failed to update activity");
    }
  },

  deleteActivity: async (activityId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${activityId}`);
    } catch (error) {
      throw new Error("Failed to delete activity");
    }
  },
};

export default ActivityService;
