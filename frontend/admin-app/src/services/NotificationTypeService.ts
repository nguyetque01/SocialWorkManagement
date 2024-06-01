import httpModule from "../helpers/http.module";
import {
  INotificationType,
  ICreateNotificationType,
} from "../types/global.typing";

const API_ENDPOINT = "/NotificationTypes";

const NotificationTypeService = {
  getAllNotificationTypes: async (): Promise<INotificationType[]> => {
    try {
      const response = await httpModule.get<INotificationType[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notification types");
    }
  },

  getNotificationTypeById: async (
    NotificationTypeId: number
  ): Promise<INotificationType> => {
    try {
      const response = await httpModule.get<INotificationType>(
        `${API_ENDPOINT}/${NotificationTypeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notification type");
    }
  },

  createNotificationType: async (
    NotificationTypeData: ICreateNotificationType
  ): Promise<INotificationType> => {
    try {
      const response = await httpModule.post<INotificationType>(
        API_ENDPOINT,
        NotificationTypeData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create notification type");
    }
  },

  updateNotificationType: async (
    NotificationTypeId: number,
    NotificationTypeData: ICreateNotificationType
  ): Promise<void> => {
    try {
      await httpModule.put(
        `${API_ENDPOINT}/${NotificationTypeId}`,
        NotificationTypeData
      );
    } catch (error) {
      throw new Error("Failed to update notification type");
    }
  },

  deleteNotificationType: async (NotificationTypeId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${NotificationTypeId}`);
    } catch (error) {
      throw new Error("Failed to delete notification type");
    }
  },
};

export default NotificationTypeService;
