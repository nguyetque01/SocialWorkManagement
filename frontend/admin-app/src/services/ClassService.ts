import httpModule from "../helpers/http.module";
import { IClass, ICreateClass } from "../types/global.typing";

const API_ENDPOINT = "/Classes";

const ClassService = {
  getAllClasses: async (): Promise<IClass[]> => {
    try {
      const response = await httpModule.get<IClass[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch classes");
    }
  },

  getClassById: async (ClassId: number): Promise<IClass> => {
    try {
      const response = await httpModule.get<IClass>(
        `${API_ENDPOINT}/${ClassId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createClass: async (ClassData: ICreateClass): Promise<IClass> => {
    try {
      const response = await httpModule.post<IClass>(API_ENDPOINT, ClassData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create class");
    }
  },

  updateClass: async (
    ClassId: number,
    ClassData: ICreateClass
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${ClassId}`, ClassData);
    } catch (error) {
      throw new Error("Failed to update class");
    }
  },

  deleteClass: async (ClassId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${ClassId}`);
    } catch (error) {
      throw new Error("Failed to delete class");
    }
  },
};

export default ClassService;
