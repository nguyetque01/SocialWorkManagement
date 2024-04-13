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

  const handleSaveSuccess = async () => {
    if (activityId === 0) {
      await RecordHistoryService.createRecordHistory({
        tableName: "Activities",
        // recordId: 0,
        actionTypeId: 1,
        // actorId: 1,
        actionTime: new Date(),
        description: "Thêm mới hoạt động",
        deviceUsed: device,
        location: `${city}, ${country}`,
      });
    } else {
      await RecordHistoryService.createRecordHistory({
        tableName: "Activities",
        // recordId: 0,
        actionTypeId: 2,
        // actorId: 1,
        actionTime: new Date(),
        description: "Cập nhật hoạt động",
        deviceUsed: device,
        location: `${city}, ${country}`,
      });
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
      await RecordHistoryService.createRecordHistory({
        tableName: "Activities",
        // recordId: 0,
        actionTypeId: 3,
        // actorId: 1,
        actionTime: new Date(),
        description: "Xóa hoạt động",
        deviceUsed: device,
        location: `${city}, ${country}`,
      });
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
