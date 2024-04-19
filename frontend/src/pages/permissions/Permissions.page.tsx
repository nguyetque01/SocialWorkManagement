import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IPermission } from "../../types/global.typing";
import PermissionsGrid from "../../components/permissions/PermissionsGrid.component";
import PermissionForm from "../../components/permissions/PermissionForm.component";
import PermissionService from "../../services/PermissionService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Permissions = () => {
  const [Permissions, setPermissions] = useState<IPermission[]>([]);
  const [PermissionId, setPermissionId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const PermissionsData = await PermissionService.getAllPermissions();
      setPermissions(PermissionsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách quyền hạn:", error);
      toast.error("Lỗi khi tải danh sách quyền hạn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setPermissionId(0);
    openModal();
  };

  const handleClickEditBtn = (PermissionId: number) => {
    setPermissionId(PermissionId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Permissions",
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

  const handleSaveSuccess = async (newPermissionId: number) => {
    if (PermissionId === 0) {
      setPermissionId(newPermissionId);
      await saveRecordHistory(newPermissionId, 1, "Thêm mới quyền hạn");
    } else {
      await saveRecordHistory(PermissionId, 2, "Cập nhật quyền hạn");
    }
    fetchPermissions();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (PermissionId: number) => {
    setDeleteItemId(PermissionId);
    openDeleteDialog();
  };

  const deletePermission = async () => {
    try {
      await PermissionService.deletePermission(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa quyền hạn");
      closeModal();
      fetchPermissions();
      toast.success("quyền hạn đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa quyền hạn:", error);
      toast.error("Lỗi khi xóa quyền hạn. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách quyền hạn</h2>
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
            <PermissionForm
              PermissionId={PermissionId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : Permissions.length === 0 ? (
        <h1>Không tìm thấy quyền hạn nào.</h1>
      ) : (
        <>
          <PermissionsGrid
            data={Permissions}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"quyền hạn"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deletePermission}
          />
        </>
      )}
    </div>
  );
};

export default Permissions;
