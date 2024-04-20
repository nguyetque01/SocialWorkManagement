import httpModule from "../helpers/http.module";
import { INotification, ICreateNotification } from "../types/global.typing";

const API_ENDPOINT = "/Notifications";

const NotificationService = {
  getAllNotifications: async (): Promise<INotification[]> => {
    try {
      const response = await httpModule.get<INotification[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notifications");
    }
  },

  getNotificationById: async (
    NotificationId: number
  ): Promise<INotification> => {
    try {
      const response = await httpModule.get<INotification>(
        `${API_ENDPOINT}/${NotificationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notification");
    }
  },

  createNotification: async (
    NotificationData: ICreateNotification
  ): Promise<INotification> => {
    try {
      const response = await httpModule.post<INotification>(
        API_ENDPOINT,
        NotificationData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create notification");
    }
  },

  updateNotification: async (
    NotificationId: number,
    NotificationData: ICreateNotification
  ): Promise<void> => {
    try {
      await httpModule.put(
        `${API_ENDPOINT}/${NotificationId}`,
        NotificationData
      );
    } catch (error) {
      throw new Error("Failed to update notification");
    }
  },

  deleteNotification: async (NotificationId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${NotificationId}`);
    } catch (error) {
      throw new Error("Failed to delete notification");
    }
  },
};

export default NotificationService;
