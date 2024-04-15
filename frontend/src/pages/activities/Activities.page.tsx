import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivity } from "../../types/global.typing";
import ActivitiesGrid from "../../components/activities/ActivitiesGrid.component";
import ActivityForm from "../../components/activities/ActivityForm.component";
import ActivityService from "../../services/ActivityService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activityId, setActivityId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const activitiesData = await ActivityService.getAllActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách hoạt động:", error);
      toast.error("Lỗi khi tải danh sách hoạt động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setActivityId(0);
    openModal();
  };

  const handleClickEditBtn = (activityId: number) => {
    setActivityId(activityId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Activities",
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

  const handleSaveSuccess = async (newActivityId: number) => {
    if (activityId === 0) {
      setActivityId(newActivityId);
      await saveRecordHistory(newActivityId, 1, "Thêm mới hoạt động");
    } else {
      await saveRecordHistory(activityId, 2, "Cập nhật hoạt động");
    }
    fetchActivities();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (activityId: number) => {
    setDeleteItemId(activityId);
    openDeleteDialog();
  };

  const deleteActivity = async () => {
    try {
      await ActivityService.deleteActivity(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa hoạt động");
      closeModal();
      fetchActivities();
      toast.success("Hoạt động đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa hoạt động:", error);
      toast.error("Lỗi khi xóa hoạt động. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách hoạt động</h2>
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
            <ActivityForm
              activityId={activityId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : activities.length === 0 ? (
        <h1>Không tìm thấy hoạt động nào.</h1>
      ) : (
        <>
          <ActivitiesGrid
            data={activities}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"hoạt động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteActivity}
          />
        </>
      )}
    </div>
  );
};

export default Activities;
