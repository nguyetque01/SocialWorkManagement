import httpModule from "../helpers/http.module";
import { IFaculty, ICreateFaculty } from "../types/global.typing";

const API_ENDPOINT = "/Faculties";

const FacultyService = {
  getAllFaculties: async (): Promise<IFaculty[]> => {
    try {
      const response = await httpModule.get<IFaculty[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch faculties");
    }
  },

  getFacultyById: async (FacultyId: string): Promise<IFaculty> => {
    try {
      const response = await httpModule.get<IFaculty>(
        `${API_ENDPOINT}/${FacultyId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch faculty");
    }
  },

  createFaculty: async (FacultyData: ICreateFaculty): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, FacultyData);
    } catch (error) {
      throw new Error("Failed to create faculty");
    }
  },

  updateFaculty: async (
    FacultyId: string,
    FacultyData: ICreateFaculty
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${FacultyId}`, FacultyData);
    } catch (error) {
      throw new Error("Failed to update faculty");
    }
  },

  deleteFaculty: async (FacultyId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${FacultyId}`);
    } catch (error) {
      throw new Error("Failed to delete faculty");
    }
  },
};

export default FacultyService;
