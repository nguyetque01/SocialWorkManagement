import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActionType } from "../../types/global.typing";
import ActionTypesGrid from "../../components/action-types/ActionTypesGrid.component";
import ActionTypeForm from "../../components/action-types/ActionTypeForm.component";
import ActionTypeService from "../../services/ActionTypeService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const ActionTypes = () => {
  const [actionTypes, setActionTypes] = useState<IActionType[]>([]);
  const [actionTypeId, setActionTypeId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchActionTypes();
  }, []);

  const fetchActionTypes = async () => {
    try {
      setLoading(true);
      const actionTypesData = await ActionTypeService.getAllActionTypes();
      setActionTypes(actionTypesData);
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
    setActionTypeId(0);
    openModal();
  };

  const handleClickEditBtn = (actionTypeId: number) => {
    setActionTypeId(actionTypeId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "ActionTypes",
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

  const handleSaveSuccess = async (newActionTypeId: number) => {
    if (actionTypeId === 0) {
      setActionTypeId(newActionTypeId);
      await saveRecordHistory(newActionTypeId, 1, "Thêm mới loại hành động");
    } else {
      await saveRecordHistory(actionTypeId, 2, "Cập nhật loại hành động");
    }
    fetchActionTypes();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (actionTypeId: number) => {
    setDeleteItemId(actionTypeId);
    openDeleteDialog();
  };

  const deleteActionType = async () => {
    try {
      await ActionTypeService.deleteActionType(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa loại hành động");
      closeModal();
      fetchActionTypes();
      toast.success("Loại hành động đã được xóa thành công!");
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
              actionTypeId={actionTypeId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : actionTypes.length === 0 ? (
        <h1>Không tìm thấy loại hành động nào.</h1>
      ) : (
        <>
          <ActionTypesGrid
            data={actionTypes}
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
