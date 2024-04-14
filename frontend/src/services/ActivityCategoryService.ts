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

  getActivityCategoryById: async (ActivityCategoryId: string): Promise<IActivityCategory> => {
    try {
      const response = await httpModule.get<IActivityCategory>(
        `${API_ENDPOINT}/${ActivityCategoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity category");
    }
  },

  createActivityCategory: async (ActivityCategoryData: ICreateActivityCategory): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, ActivityCategoryData);
    } catch (error) {
      throw new Error("Failed to create activity category");
    }
  },

  updateActivityCategory: async (
    ActivityCategoryId: string,
    ActivityCategoryData: ICreateActivityCategory
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${ActivityCategoryId}`, ActivityCategoryData);
    } catch (error) {
      throw new Error("Failed to update activity category");
    }
  },

  deleteActivityCategory: async (ActivityCategoryId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${ActivityCategoryId}`);
    } catch (error) {
      throw new Error("Failed to delete activity category");
    }
  },
};

export default ActivityCategoryService;
