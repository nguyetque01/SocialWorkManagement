import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IRole } from "../../types/global.typing";
import RolesGrid from "../../components/roles/RolesGrid.component";
import RoleForm from "../../components/roles/RoleForm.component";
import RoleService from "../../services/RoleService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Roles = () => {
  const [Roles, setRoles] = useState<IRole[]>([]);
  const [RoleId, setRoleId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const RolesData = await RoleService.getAllRoles();
      setRoles(RolesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách vai trò:", error);
      toast.error("Lỗi khi tải danh sách vai trò. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setRoleId(0);
    openModal();
  };

  const handleClickEditBtn = (RoleId: number) => {
    setRoleId(RoleId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Roles",
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

  const handleSaveSuccess = async (newRoleId: number) => {
    if (RoleId === 0) {
      setRoleId(newRoleId);
      await saveRecordHistory(newRoleId, 1, "Thêm mới vai trò");
    } else {
      await saveRecordHistory(RoleId, 2, "Cập nhật vai trò");
    }
    fetchRoles();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (RoleId: number) => {
    setDeleteItemId(RoleId);
    openDeleteDialog();
  };

  const deleteRole = async () => {
    try {
      await RoleService.deleteRole(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa vai trò");
      closeModal();
      fetchRoles();
      toast.success("vai trò đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa vai trò:", error);
      toast.error("Lỗi khi xóa vai trò. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách vai trò</h2>
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
            <RoleForm
              RoleId={RoleId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : Roles.length === 0 ? (
        <h1>Không tìm thấy vai trò nào.</h1>
      ) : (
        <>
          <RolesGrid
            data={Roles}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"vai trò"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteRole}
          />
        </>
      )}
    </div>
  );
};

export default Roles;
