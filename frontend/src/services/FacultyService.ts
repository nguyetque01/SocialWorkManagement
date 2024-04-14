import httpModule from "../helpers/http.module";
import { IFaculty, ICreateFaculty } from "../types/global.typing";

const API_ENDPOINT = "/Facultys";

const FacultyService = {
  getAllFacultys: async (): Promise<IFaculty[]> => {
    try {
      const response = await httpModule.get<IFaculty[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action types");
    }
  },

  getFacultyById: async (FacultyId: string): Promise<IFaculty> => {
    try {
      const response = await httpModule.get<IFaculty>(
        `${API_ENDPOINT}/${FacultyId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createFaculty: async (
    FacultyData: ICreateFaculty
  ): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, FacultyData);
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateFaculty: async (
    FacultyId: string,
    FacultyData: ICreateFaculty
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${FacultyId}`, FacultyData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteFaculty: async (FacultyId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${FacultyId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default FacultyService;
