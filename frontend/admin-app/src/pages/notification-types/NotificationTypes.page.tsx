import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { INotificationType } from "../../types/global.typing";
import NotificationTypesGrid from "../../components/notification-types/NotificationTypesGrid.component";
import NotificationTypeForm from "../../components/notification-types/NotificationTypeForm.component";
import NotificationTypeService from "../../services/NotificationTypeService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const NotificationTypes = () => {
  const [NotificationTypes, setNotificationTypes] = useState<
    INotificationType[]
  >([]);
  const [NotificationTypeId, setNotificationTypeId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchNotificationTypes();
  }, []);

  const fetchNotificationTypes = async () => {
    try {
      setLoading(true);
      const NotificationTypesData =
        await NotificationTypeService.getAllNotificationTypes();
      setNotificationTypes(NotificationTypesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách loại thông báo:", error);
      toast.error("Lỗi khi tải danh sách loại thông báo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setNotificationTypeId(0);
    openModal();
  };

  const handleClickEditBtn = (NotificationTypeId: number) => {
    setNotificationTypeId(NotificationTypeId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "NotificationTypes",
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

  const handleSaveSuccess = async (newNotificationTypeId: number) => {
    if (NotificationTypeId === 0) {
      setNotificationTypeId(newNotificationTypeId);
      await saveRecordHistory(
        newNotificationTypeId,
        1,
        "Thêm mới loại thông báo"
      );
    } else {
      await saveRecordHistory(NotificationTypeId, 2, "Cập nhật loại thông báo");
    }
    fetchNotificationTypes();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (NotificationTypeId: number) => {
    setDeleteItemId(NotificationTypeId);
    openDeleteDialog();
  };

  const deleteNotificationType = async () => {
    try {
      await NotificationTypeService.deleteNotificationType(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa loại thông báo");
      closeModal();
      fetchNotificationTypes();
      toast.success("loại thông báo đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa loại thông báo:", error);
      toast.error("Lỗi khi xóa loại thông báo. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách loại thông báo</h2>
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
            <NotificationTypeForm
              NotificationTypeId={NotificationTypeId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : NotificationTypes.length === 0 ? (
        <h1>Không tìm thấy loại thông báo nào.</h1>
      ) : (
        <>
          <NotificationTypesGrid
            data={NotificationTypes}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"loại thông báo"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteNotificationType}
          />
        </>
      )}
    </div>
  );
};

export default NotificationTypes;
