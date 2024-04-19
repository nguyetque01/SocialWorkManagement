import httpModule from "../helpers/http.module";
import {
  IActivityParticipation,
  ICreateActivityParticipation,
} from "../types/global.typing";

const API_ENDPOINT = "/ActivityParticipations";

const ActivityParticipationService = {
  getAllActivityParticipations: async (): Promise<IActivityParticipation[]> => {
    try {
      const response = await httpModule.get<IActivityParticipation[]>(
        API_ENDPOINT
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity participations");
    }
  },

  getActivityParticipationById: async (
    activityParticipationId: number
  ): Promise<IActivityParticipation> => {
    try {
      const response = await httpModule.get<IActivityParticipation>(
        `${API_ENDPOINT}/${activityParticipationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch activity participation");
    }
  },

  createActivityParticipation: async (
    activityParticipationData: ICreateActivityParticipation
  ): Promise<IActivityParticipation> => {
    try {
      const response = await httpModule.post<IActivityParticipation>(
        API_ENDPOINT,
        activityParticipationData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create activity participation");
    }
  },

  updateActivityParticipation: async (
    activityParticipationId: number,
    activityParticipationData: ICreateActivityParticipation
  ): Promise<void> => {
    try {
      await httpModule.put(
        `${API_ENDPOINT}/${activityParticipationId}`,
        activityParticipationData
      );
    } catch (error) {
      throw new Error("Failed to update activity participation");
    }
  },

  deleteActivityParticipation: async (
    activityParticipationId: number
  ): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${activityParticipationId}`);
    } catch (error) {
      throw new Error("Failed to delete activity participation");
    }
  },
};

export default ActivityParticipationService;
