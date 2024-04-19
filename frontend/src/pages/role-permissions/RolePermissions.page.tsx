import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IPermission, IRole, IRolePermission } from "../../types/global.typing";
import RolePermissionsGrid from "../../components/role-permissions/RolePermissionsGrid.component";
import RolePermissionForm from "../../components/role-permissions/RolePermissionForm.component";
import RolePermissionService from "../../services/RolePermissionService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";
import RoleService from "../../services/RoleService";
import PermissionService from "../../services/PermissionService";

const RolePermissions = () => {
  const [RolePermissions, setRolePermissions] = useState<IRolePermission[]>([]);
  const [Roles, setRoles] = useState<IRole[]>([]);
  const [Permissions, setPermissions] = useState<IPermission[]>([]);
  const [RolePermissionId, setRolePermissionId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchRolePermissions();
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRolePermissions = async () => {
    try {
      setLoading(true);
      const rolePermissionsData =
        await RolePermissionService.getAllRolePermissions();
      setRolePermissions(rolePermissionsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phân quyền:", error);
      toast.error("Lỗi khi tải danh sách phân quyền. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const rolesData = await RoleService.getAllRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách vai trò:", error);
      toast.error("Lỗi khi tải danh sách vai trò. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const permissionsData = await PermissionService.getAllPermissions();
      setPermissions(permissionsData);
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
    setRolePermissionId(0);
    openModal();
  };

  const handleClickEditBtn = (RolePermissionId: number) => {
    setRolePermissionId(RolePermissionId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "RolePermissions",
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

  const handleSaveSuccess = async (newRolePermissionId: number) => {
    if (RolePermissionId === 0) {
      setRolePermissionId(newRolePermissionId);
      await saveRecordHistory(newRolePermissionId, 1, "Thêm mới phân quyền");
    } else {
      await saveRecordHistory(RolePermissionId, 2, "Cập nhật phân quyền");
    }
    fetchRolePermissions();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (RolePermissionId: number) => {
    setDeleteItemId(RolePermissionId);
    openDeleteDialog();
  };

  const deleteRolePermission = async () => {
    try {
      await RolePermissionService.deleteRolePermission(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa phân quyền");
      closeModal();
      fetchRolePermissions();
      toast.success("phân quyền đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phân quyền:", error);
      toast.error("Lỗi khi xóa phân quyền. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách phân quyền</h2>
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
            <RolePermissionForm
              RolePermissionId={RolePermissionId}
              roles={Roles}
              permissions={Permissions}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : RolePermissions.length === 0 ? (
        <h1>Không tìm thấy phân quyền nào.</h1>
      ) : (
        <>
          <RolePermissionsGrid
            data={RolePermissions}
            roles={Roles}
            permissions={Permissions}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"phân quyền"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteRolePermission}
          />
        </>
      )}
    </div>
  );
};

export default RolePermissions;
