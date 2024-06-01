import httpModule from "../helpers/http.module";
import { IActivity } from "../types/global.typing";

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

  getActivityById: async (activityId: number): Promise<IActivity> => {
    try {
      const response = await httpModule.get<IActivity>(
        `${API_ENDPOINT}/${activityId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity");
    }
  },
};

export default ActivityService;
