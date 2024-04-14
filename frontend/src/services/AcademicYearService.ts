import httpModule from "../helpers/http.module";
import { IAcademicYear, ICreateAcademicYear } from "../types/global.typing";

const API_ENDPOINT = "/AcademicYears";

const AcademicYearService = {
  getAllAcademicYears: async (): Promise<IAcademicYear[]> => {
    try {
      const response = await httpModule.get<IAcademicYear[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action types");
    }
  },

  getAcademicYearById: async (AcademicYearId: string): Promise<IAcademicYear> => {
    try {
      const response = await httpModule.get<IAcademicYear>(
        `${API_ENDPOINT}/${AcademicYearId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createAcademicYear: async (
    AcademicYearData: ICreateAcademicYear
  ): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, AcademicYearData);
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateAcademicYear: async (
    AcademicYearId: string,
    AcademicYearData: ICreateAcademicYear
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${AcademicYearId}`, AcademicYearData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteAcademicYear: async (AcademicYearId: string): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${AcademicYearId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default AcademicYearService;
