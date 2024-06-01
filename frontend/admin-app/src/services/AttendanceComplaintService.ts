import httpModule from "../helpers/http.module";
import { IAttendanceComplaint, ICreateAttendanceComplaint } from "../types/global.typing";

const API_ENDPOINT = "/AttendanceComplaints";

const AttendanceComplaintService = {
  getAllAttendanceComplaints: async (): Promise<IAttendanceComplaint[]> => {
    try {
      const response = await httpModule.get<IAttendanceComplaint[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch attendance complaints");
    }
  },

  getAttendanceComplaintById: async (attendanceComplaintId: number): Promise<IAttendanceComplaint> => {
    try {
      const response = await httpModule.get<IAttendanceComplaint>(
        `${API_ENDPOINT}/${attendanceComplaintId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch attendance complaint");
    }
  },

  createAttendanceComplaint: async (
    attendanceComplaintData: ICreateAttendanceComplaint
  ): Promise<IAttendanceComplaint> => {
    try {
      const response = await httpModule.post<IAttendanceComplaint>(
        API_ENDPOINT,
        attendanceComplaintData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create attendance complaint");
    }
  },

  updateAttendanceComplaint: async (
    attendanceComplaintId: number,
    attendanceComplaintData: ICreateAttendanceComplaint
  ): Promise<void> => {
    try {
      await httpModule.put(`${API_ENDPOINT}/${attendanceComplaintId}`, attendanceComplaintData);
    } catch (error) {
      throw new Error("Failed to update attendance complaint");
    }
  },

  deleteAttendanceComplaint: async (attendanceComplaintId: number): Promise<void> => {
    try {
      await httpModule.delete(`${API_ENDPOINT}/${attendanceComplaintId}`);
    } catch (error) {
      throw new Error("Failed to delete attendance complaint");
    }
  },
};

export default AttendanceComplaintService;
