import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IClass } from "../../types/global.typing";
import ClassesGrid from "../../components/classes/ClassesGrid.component";
import ClassForm from "../../components/classes/ClassForm.component";
import ClassService from "../../services/ClassService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Classes = () => {
  const [Classes, setClasses] = useState<IClass[]>([]);
  const [ClassId, setClassId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchClasss();
  }, []);

  const fetchClasss = async () => {
    try {
      setLoading(true);
      const ClasssData = await ClassService.getAllClasses();
      setClasses(ClasssData);
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
    setClassId(0);
    openModal();
  };

  const handleClickEditBtn = (ClassId: number) => {
    setClassId(ClassId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Classs",
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

  const handleSaveSuccess = async (newClassId: number) => {
    if (ClassId === 0) {
      setClassId(newClassId);
      await saveRecordHistory(newClassId, 1, "Thêm mới loại hành động");
    } else {
      await saveRecordHistory(ClassId, 2, "Cập nhật loại hành động");
    }
    fetchClasss();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (ClassId: number) => {
    setDeleteItemId(ClassId);
    openDeleteDialog();
  };

  const deleteClass = async () => {
    try {
      await ClassService.deleteClass(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa loại hành động");
      closeModal();
      fetchClasss();
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
            <ClassForm
              ClassId={ClassId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : Classes.length === 0 ? (
        <h1>Không tìm thấy loại hành động nào.</h1>
      ) : (
        <>
          <ClassesGrid
            data={Classes}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"loại hành động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteClass}
          />
        </>
      )}
    </div>
  );
};

export default Classes;
