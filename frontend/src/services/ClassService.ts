import httpModule from "../helpers/http.module";
import { IClass, ICreateClass } from "../types/global.typing";

const API_ENDPOINT = "/Classes";

const ClassService = {
  getAllClasses: async (): Promise<IClass[]> => {
    try {
      const response = await httpModule.get<IClass[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action types");
    }
  },

  getClassById: async (ClassId: string): Promise<IClass> => {
    try {
      const response = await httpModule.get<IClass>(
        `${API_ENDPOINT}/${ClassId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createClass: async (ClassData: ICreateClass): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, ClassData);
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateClass: async (
    ClassId: string,
    ClassData: ICreateClass
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${ClassId}`, ClassData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteClass: async (ClassId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${ClassId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default ClassService;
