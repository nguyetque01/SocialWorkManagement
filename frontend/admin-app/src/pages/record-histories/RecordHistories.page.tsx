import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { IActionType, IRecordHistory } from "../../types/global.typing";
import RecordHistoriesGrid from "../../components/record-histories/RecordHistoriesGrid.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import ActionTypeService from "../../services/ActionTypeService";

const RecordHistories = () => {
  const [RecordHistories, setRecordHistories] = useState<IRecordHistory[]>([]);
  const [ActionTypes, setActionTypes] = useState<IActionType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchRecordHistories();
    fetchActionTypes();
  }, []);

  const fetchRecordHistories = async () => {
    try {
      setLoading(true);
      const RecordHistoriesData =
        await RecordHistoryService.getAllRecordHistories();
      setRecordHistories(RecordHistoriesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách lịch sử bản ghi:", error);
      toast.error("Lỗi khi tải danh sách lịch sử bản ghi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchActionTypes = async () => {
    try {
      setLoading(true);
      const ActionTypesData = await ActionTypeService.getAllActionTypes();
      setActionTypes(ActionTypesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách loại hành động:", error);
      toast.error("Lỗi khi tải danh sách loại hành động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách lịch sử bản ghi</h2>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : RecordHistories.length === 0 ? (
        <h1>Không tìm thấy lịch sử bản ghi nào.</h1>
      ) : (
        <>
          <RecordHistoriesGrid
            data={RecordHistories}
            actionTypes={ActionTypes}
          />
        </>
      )}
    </div>
  );
};

export default RecordHistories;
