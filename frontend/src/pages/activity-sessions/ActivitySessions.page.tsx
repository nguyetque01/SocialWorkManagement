import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivitySession } from "../../types/global.typing";
import ActivitySessionsGrid from "../../components/activity-sessions/ActivitySessionsGrid.component";
import ActivitySessionForm from "../../components/activity-sessions/ActivitySessionForm.component";
import ActivitySessionService from "../../services/ActivitySessionService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const ActivitySessions = () => {
  const [ActivitySessions, setActivitySessions] = useState<
    IActivitySession[]
  >([]);
  const [activitySessionId, setActivitySessionId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchActivitySessions();
  }, []);

  const fetchActivitySessions = async () => {
    try {
      setLoading(true);
      const ActivitySessionsData =
        await ActivitySessionService.getAllactivitySessions();
      setActivitySessions(ActivitySessionsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phiên hoạt động:", error);
      toast.error(
        "Lỗi khi tải danh sách phiên hoạt động. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setActivitySessionId(0);
    openModal();
  };

  const handleClickEditBtn = (activitySessionId: number) => {
    setActivitySessionId(activitySessionId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "ActivitySessions",
        recordId: recordId,
        actionTypeId: actionTypeId,
        // actorId: 1,
        actionTime: currentDate,
        description: description,
        deviceUsed: device,
        location: `${city}, ${country}`,
      });
    } catch (error) {
      console.error("Lỗi khi lưu lịch sử:", error);
    }
  };

  const handleSaveSuccess = async (newActivitySessionId: number) => {
    if (activitySessionId === 0) {
      setActivitySessionId(newActivitySessionId);
      await saveRecordHistory(newActivitySessionId, 1, "Thêm mới loại hành động");
    } else {
      await saveRecordHistory(activitySessionId, 2, "Cập nhật loại hành động");
    }
    fetchActivitySessions();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (activitySessionId: number) => {
    setDeleteItemId(activitySessionId);
    openDeleteDialog();
  };

  const deleteActivitySession = async () => {
    try {
      await ActivitySessionService.deleteActivitySession(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa phiên hành động");
      closeModal();
      fetchActivitySessions();
      toast.success("phiên hoạt động đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phiên hoạt động:", error);
      toast.error("Lỗi khi xóa phiên hoạt động. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách phiên hoạt động</h2>
        <Button variant="outlined" onClick={handleClickAddBtn}>
          <Add />
        </Button>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-container"
        >
          <div className="modal-content">
            <ActivitySessionForm
              activitySessionId={activitySessionId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : ActivitySessions.length === 0 ? (
        <h1>Không tìm thấy phiên hoạt động nào.</h1>
      ) : (
        <>
          <ActivitySessionsGrid
            data={ActivitySessions}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"phiên hoạt động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteActivitySession}
          />
        </>
      )}
    </div>
  );
};

export default ActivitySessions;
