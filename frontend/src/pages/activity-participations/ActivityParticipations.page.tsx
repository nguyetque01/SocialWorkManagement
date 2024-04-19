import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivityParticipation } from "../../types/global.typing";
import ActivityParticipationsGrid from "../../components/activity-participations/ActivityParticipationsGrid.component";
import ActivityParticipationForm from "../../components/activity-participations/ActivityParticipationForm.component";
import ActivityParticipationService from "../../services/ActivityParticipationService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const ActivityParticipations = () => {
  const [activityParticipations, setActivityParticipations] = useState<IActivityParticipation[]>([]);
  const [activityParticipationId, setActivityParticipationId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchActivityParticipations();
  }, []);

  const fetchActivityParticipations = async () => {
    try {
      setLoading(true);
      const activityParticipationsData = await ActivityParticipationService.getAllActivityParticipations();
      setActivityParticipations(activityParticipationsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách hoạt động tham gia:", error);
      toast.error("Lỗi khi tải danh sách hoạt động tham gia. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setActivityParticipationId(0);
    openModal();
  };

  const handleClickEditBtn = (activityParticipationId: number) => {
    setActivityParticipationId(activityParticipationId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "ActivityParticipations",
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

  const handleSaveSuccess = async (newActivityParticipationId: number) => {
    if (activityParticipationId === 0) {
      setActivityParticipationId(newActivityParticipationId);
      await saveRecordHistory(newActivityParticipationId, 1, "Thêm mới hoạt động tham gia");
    } else {
      await saveRecordHistory(activityParticipationId, 2, "Cập nhật hoạt động tham gia");
    }
    fetchActivityParticipations();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (activityParticipationId: number) => {
    setDeleteItemId(activityParticipationId);
    openDeleteDialog();
  };

  const deleteActivityParticipation = async () => {
    try {
      await ActivityParticipationService.deleteActivityParticipation(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa hoạt động tham gia");
      closeModal();
      fetchActivityParticipations();
      toast.success("hoạt động tham gia đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa hoạt động tham gia:", error);
      toast.error("Lỗi khi xóa hoạt động tham gia. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách hoạt động tham gia</h2>
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
            <ActivityParticipationForm
              activityParticipationId={activityParticipationId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : ActivityParticipations.length === 0 ? (
        <h1>Không tìm thấy hoạt động tham gia nào.</h1>
      ) : (
        <>
          <ActivityParticipationsGrid
            data={activityParticipations}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"hoạt động tham gia"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteActivityParticipation}
          />
        </>
      )}
    </div>
  );
};

export default ActivityParticipations;
