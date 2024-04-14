import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IClass } from "../../types/global.typing";
import ClassesGrid from "../../components/class/ClassesGrid.component";
import ClassForm from "../../components/class/ClassForm.component";
import Classeservice from "../../services/ClassService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";

const Classes = () => {
  const [Classes, setClasses] = useState<IClass[]>([]);
  const [ClassId, setClassId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("0");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const ClassesData = await Classeservice.getAllClasses();
      setClasses(ClassesData);
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
    setClassId("0");
    openModal();
  };

  const handleClickEditBtn = (ClassId: string) => {
    setClassId(ClassId);
    openModal();
  };

  const handleSaveSuccess = () => {
    fetchClasses();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (ClassId: string) => {
    setDeleteItemId(ClassId);
    openDeleteDialog();
  };

  const deleteClass = async () => {
    try {
      await Classeservice.deleteClass(deleteItemId);
      closeModal();
      fetchClasses();
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
