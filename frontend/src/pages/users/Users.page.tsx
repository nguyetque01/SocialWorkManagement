import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IUser } from "../../types/global.typing";
import UsersGrid from "../../components/users/UsersGrid.component";
import UserForm from "../../components/users/UserForm.component";
import UserService from "../../services/UserService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Users = () => {
  const [Users, setUsers] = useState<IUser[]>([]);
  const [userId, setuserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const UsersData = await UserService.getAllUsers();
      setUsers(UsersData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
      toast.error("Lỗi khi tải danh sách người dùng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setuserId(0);
    openModal();
  };

  const handleClickEditBtn = (userId: number) => {
    setuserId(userId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Users",
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

  const handleSaveSuccess = async (newuserId: number) => {
    if (userId === 0) {
      setuserId(newuserId);
      await saveRecordHistory(newuserId, 1, "Thêm mới người dùng");
    } else {
      await saveRecordHistory(userId, 2, "Cập nhật người dùng");
    }
    fetchUsers();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (userId: number) => {
    setDeleteItemId(userId);
    openDeleteDialog();
  };

  const deleteUser = async () => {
    try {
      await UserService.deleteUser(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa người dùng");
      closeModal();
      fetchUsers();
      toast.success("Người dùng đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      toast.error("Lỗi khi xóa người dùng. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách người dùng</h2>
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
            <UserForm
              userId={userId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : Users.length === 0 ? (
        <h1>Không tìm thấy người dùng nào.</h1>
      ) : (
        <>
          <UsersGrid
            data={Users}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"người dùng"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteUser}
          />
        </>
      )}
    </div>
  );
};

export default Users;
