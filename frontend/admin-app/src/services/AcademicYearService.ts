import httpModule from "../helpers/http.module";
import { IAcademicYear, ICreateAcademicYear } from "../types/global.typing";

const API_ENDPOINT = "/AcademicYears";

const AcademicYearService = {
  getAllAcademicYears: async (): Promise<IAcademicYear[]> => {
    try {
      const response = await httpModule.get<IAcademicYear[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch academic years");
    }
  },

  getAcademicYearById: async (academicYearId: number): Promise<IAcademicYear> => {
    try {
      const response = await httpModule.get<IAcademicYear>(
        `${API_ENDPOINT}/${academicYearId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch action type");
    }
  },

  createAcademicYear: async (
    academicYearData: ICreateAcademicYear
  ): Promise<IAcademicYear> => {
    try {
      const response = await httpModule.post<IAcademicYear>(API_ENDPOINT, academicYearData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create action type");
    }
  },

  updateAcademicYear: async (
    academicYearId: number,
    AcademicYearData: ICreateAcademicYear
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${academicYearId}`, AcademicYearData);
    } catch (error) {
      throw new Error("Failed to update action type");
    }
  },

  deleteAcademicYear: async (academicYearId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${academicYearId}`);
    } catch (error) {
      throw new Error("Failed to delete action type");
    }
  },
};

export default AcademicYearService;
