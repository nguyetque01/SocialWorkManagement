import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActionType } from "../../types/global.typing";
import ActionTypesGrid from "../../components/action-types/ActionTypesGrid.component";
import ActionTypeForm from "../../components/action-types/ActionTypeForm.component";
import ActionTypeService from "../../services/ActionTypeService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";

const ActionTypes = () => {
  const [ActionTypes, setActionTypes] = useState<IActionType[]>([]);
  const [ActionTypeId, setActionTypeId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("0");

  useEffect(() => {
    fetchActionTypes();
  }, []);

  const fetchActionTypes = async () => {
    try {
      setLoading(true);
      const ActionTypesData = await ActionTypeService.getAllActionTypes();
      setActionTypes(ActionTypesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách loại hành động:", error);
      toast.error("Lỗi khi tải danh sách loại hành động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setActionTypeId("0");
    openModal();
  };

  const handleClickEditBtn = (ActionTypeId: string) => {
    setActionTypeId(ActionTypeId);
    openModal();
  };

  const handleSaveSuccess = () => {
    fetchActionTypes();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (ActionTypeId: string) => {
    setDeleteItemId(ActionTypeId);
    openDeleteDialog();
  };

  const deleteActionType = async () => {
    try {
      await ActionTypeService.deleteActionType(deleteItemId);
      closeModal();
      fetchActionTypes();
      toast.success("loại hành động đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa loại hành động:", error);
      toast.error("Lỗi khi xóa loại hành động. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách loại hành động</h2>
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
            <ActionTypeForm
              ActionTypeId={ActionTypeId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : ActionTypes.length === 0 ? (
        <h1>Không tìm thấy loại hành động nào.</h1>
      ) : (
        <>
          <ActionTypesGrid
            data={ActionTypes}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"loại hành động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteActionType}
          />
        </>
      )}
    </div>
  );
};

export default ActionTypes;
