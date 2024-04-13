import httpModule from "../helpers/http.module";
import { IActionType, ICreateActionType } from "../types/global.typing";

const API_ENDPOINT = "/ActionTypes";

const ActionTypeService = {
  getAllActionTypes: async (): Promise<IActionType[]> => {
    try {
      const response = await httpModule.get<IActionType[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action types");
    }
  },

  getActionTypeById: async (ActionTypeId: string): Promise<IActionType> => {
    try {
      const response = await httpModule.get<IActionType>(
        `${API_ENDPOINT}/${ActionTypeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createActionType: async (
    ActionTypeData: ICreateActionType
  ): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, ActionTypeData);
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateActionType: async (
    ActionTypeId: string,
    ActionTypeData: ICreateActionType
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${ActionTypeId}`, ActionTypeData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteActionType: async (ActionTypeId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${ActionTypeId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default ActionTypeService;
