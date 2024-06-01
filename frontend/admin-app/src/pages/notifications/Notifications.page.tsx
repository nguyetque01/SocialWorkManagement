import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { INotification, INotificationType } from "../../types/global.typing";
import NotificationsGrid from "../../components/notifications/NotificationsGrid.component";
import NotificationForm from "../../components/notifications/NotificationForm.component";
import NotificationService from "../../services/NotificationService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import NotificationTypeService from "../../services/NotificationTypeService";
import { MainContext } from "../../context/main.context";

const Notifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationTypes, setNotificationTypes] = useState<
    INotificationType[]
  >([]);
  const [notificationId, setnotificationId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchNotifications();
    fetchNotificationTypes();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const NotificationsData = await NotificationService.getAllNotifications();
      setNotifications(NotificationsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thông báo:", error);
      toast.error("Lỗi khi tải danh sách thông báo. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

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
    setnotificationId(0);
    openModal();
  };

  const handleClickEditBtn = (notificationId: number) => {
    setnotificationId(notificationId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Notifications",
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

  const handleSaveSuccess = async (newnotificationId: number) => {
    if (notificationId === 0) {
      setnotificationId(newnotificationId);
      await saveRecordHistory(newnotificationId, 1, "Thêm mới thông báo");
    } else {
      await saveRecordHistory(notificationId, 2, "Cập nhật thông báo");
    }
    fetchNotifications();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (notificationId: number) => {
    setDeleteItemId(notificationId);
    openDeleteDialog();
  };

  const deleteNotification = async () => {
    try {
      await NotificationService.deleteNotification(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa thông báo");
      closeModal();
      fetchNotifications();
      toast.success("thông báo đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      toast.error("Lỗi khi xóa thông báo. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách thông báo</h2>
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
            <NotificationForm
              notificationId={notificationId}
              notificationTypes={notificationTypes}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : notifications.length === 0 ? (
        <h1>Không tìm thấy thông báo nào.</h1>
      ) : (
        <>
          <NotificationsGrid
            data={notifications}
            notificationTypes={notificationTypes}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"thông báo"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteNotification}
          />
        </>
      )}
    </div>
  );
};

export default Notifications;
