import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivity } from "../../types/global.typing";
import ActivitiesGrid from "../../components/activities/ActivitiesGrid.component";
import ActivityForm from "../../components/activities/ActivityForm.component";
import ActivityService from "../../services/ActivityService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import "./activities.scss";

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activityId, setActivityId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("0");

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
    setActivityId("0");
    openModal();
  };

  const handleClickEditBtn = (activityId: string) => {
    setActivityId(activityId);
    openModal();
  };

  const handleSaveSuccess = () => {
    fetchActivities();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (activityId: string) => {
    setDeleteItemId(activityId);
    openDeleteDialog();
  };

  const deleteActivity = async () => {
    try {
      await ActivityService.deleteActivity(deleteItemId);
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
    <div className="content activities">
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
