import httpModule from "../helpers/http.module";
import { IActivityCategory, ICreateActivityCategory } from "../types/global.typing";

const API_ENDPOINT = "/ActivityCategories";

const ActivityCategoryService = {
  getAllActivityCategories: async (): Promise<IActivityCategory[]> => {
    try {
      const response = await httpModule.get<IActivityCategory[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity categories");
    }
  }, 

  getActivityCategoryById: async (ActivityCategoryId: number): Promise<IActivityCategory> => {
    try {
      const response = await httpModule.get<IActivityCategory>(
        `${API_ENDPOINT}/${ActivityCategoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity category");
    }
  },

  createActivityCategory: async (activityCategoryData: ICreateActivityCategory): Promise<IActivityCategory> => {
    try {
      const response = await httpModule.post(
        API_ENDPOINT, 
        activityCategoryData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create activity category");
    }
  },

  updateActivityCategory: async (
    activityCategoryId: number,
    activityCategoryData: ICreateActivityCategory
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${activityCategoryId}`, activityCategoryData);
    } catch (error) {
      throw new Error("Failed to update activity category");
    }
  },

  deleteActivityCategory: async (activityCategoryId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${activityCategoryId}`);
    } catch (error) {
      throw new Error("Failed to delete activity category");
    }
  },
};

export default ActivityCategoryService;
