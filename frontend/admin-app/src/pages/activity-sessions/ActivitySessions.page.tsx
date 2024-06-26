import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivitySessionDetail } from "../../types/activity-session.typing";
import ActivitySessionsGrid from "../../components/activity-sessions/ActivitySessionsGrid.component";
import ActivitySessionForm from "../../components/activity-sessions/ActivitySessionForm.component";
import ActivitySessionService from "../../services/ActivitySessionService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const ActivitySessions = () => {
  const [activitySessions, setActivitySessions] = useState<
    IActivitySessionDetail[]
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
        await ActivitySessionService.getAllActivitySessionDetails();
      setActivitySessions(ActivitySessionsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách buổi hoạt động:", error);
      toast.error("Lỗi khi tải danh sách buổi hoạt động. Vui lòng thử lại.");
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
      await saveRecordHistory(
        newActivitySessionId,
        1,
        "Thêm mới loại hoạt động"
      );
    } else {
      await saveRecordHistory(activitySessionId, 2, "Cập nhật loại hoạt động");
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
      await saveRecordHistory(deleteItemId, 3, "Xóa buổi hoạt động");
      closeModal();
      fetchActivitySessions();
      toast.success("buổi hoạt động đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa buổi hoạt động:", error);
      toast.error("Lỗi khi xóa buổi hoạt động. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách buổi hoạt động</h2>
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
      ) : activitySessions.length === 0 ? (
        <h1>Không tìm thấy buổi hoạt động nào.</h1>
      ) : (
        <>
          <ActivitySessionsGrid
            data={activitySessions}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"buổi hoạt động"}
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
