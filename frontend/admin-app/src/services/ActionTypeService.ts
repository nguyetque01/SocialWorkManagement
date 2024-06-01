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

  getActionTypeById: async (actionTypeId: number): Promise<IActionType> => {
    try {
      const response = await httpModule.get<IActionType>(
        `${API_ENDPOINT}/${actionTypeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createActionType: async (
    actionTypeData: ICreateActionType
  ): Promise<IActionType> => {
    try {
      const response = await httpModule.post<IActionType>(
        API_ENDPOINT,
        actionTypeData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateActionType: async (
    actionTypeId: number,
    actionTypeData: ICreateActionType
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${actionTypeId}`, actionTypeData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteActionType: async (actionTypeId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${actionTypeId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default ActionTypeService;
