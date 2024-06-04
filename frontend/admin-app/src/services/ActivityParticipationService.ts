import httpModule from "../helpers/http.module";
import { ApiResponse } from "../types/global.typing";
import {
  ICreateActivityParticipation,
  IActivityParticipation,
  IActivityParticipationDetail,
} from "../types/activity-participation.typing";

const API_ENDPOINT = "/ActivityParticipations";

const ActivityParticipationservice = {
  getAllActivityParticipations: async (): Promise<IActivityParticipation[]> => {
    try {
      const response = await httpModule.get<
        ApiResponse<IActivityParticipation[]>
      >(API_ENDPOINT);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch activity participations");
    }
  },

  getAllActivityParticipationDetails: async (): Promise<
    IActivityParticipationDetail[]
  > => {
    try {
      const response = await httpModule.get<
        ApiResponse<IActivityParticipationDetail[]>
      >(`${API_ENDPOINT}/details`);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch activity participations");
    }
  },

  getActivityParticipationById: async (
    activityParticipationId: number
  ): Promise<IActivityParticipation> => {
    try {
      const response = await httpModule.get<
        ApiResponse<IActivityParticipation>
      >(`${API_ENDPOINT}/${activityParticipationId}`);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to fetch activity participation");
    }
  },

  createActivityParticipation: async (
    activityParticipationData: ICreateActivityParticipation
  ): Promise<IActivityParticipation> => {
    try {
      const response = await httpModule.post<
        ApiResponse<IActivityParticipation>
      >(API_ENDPOINT, activityParticipationData);
      if (response.data.status === "success") {
        return response.data.responseData;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to create ActivityParticipation");
    }
  },

  updateActivityParticipation: async (
    activityParticipationId: number,
    activityParticipationData: ICreateActivityParticipation
  ): Promise<void> => {
    try {
      const response = await httpModule.put<ApiResponse<any>>(
        `${API_ENDPOINT}/${activityParticipationId}`,
        activityParticipationData
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to update activity participation");
    }
  },

  deleteActivityParticipation: async (
    activityParticipationId: number
  ): Promise<void> => {
    try {
      const response = await httpModule.delete<ApiResponse<any>>(
        `${API_ENDPOINT}/${activityParticipationId}`
      );
      if (response.data.status === "fail") {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Failed to delete activity participation");
    }
  },
};

export default ActivityParticipationservice;
