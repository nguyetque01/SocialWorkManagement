import httpModule from "../helpers/http.module";
import { IRecordHistory, ICreateRecordHistory } from "../types/global.typing";

const API_ENDPOINT = "/RecordHistories";

const RecordHistoryService = {
  getAllRecordHistories: async (): Promise<IRecordHistory[]> => {
    try {
      const response = await httpModule.get<IRecordHistory[]>(API_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch record histories");
    }
  },

  getRecordHistoryById: async (
    RecordHistoryId: string
  ): Promise<IRecordHistory> => {
    try {
      const response = await httpModule.get<IRecordHistory>(
        `${API_ENDPOINT}/${RecordHistoryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch record history");
    }
  },

  createRecordHistory: async (
    RecordHistoryData: ICreateRecordHistory
  ): Promise<void> => {
    try {
      await httpModule.post(API_ENDPOINT, RecordHistoryData);
    } catch (error) {
      throw new Error("Failed to create record history");
    }
  },
};

export default RecordHistoryService;
