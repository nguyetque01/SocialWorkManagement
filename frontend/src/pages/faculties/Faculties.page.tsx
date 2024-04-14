import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IFaculty } from "../../types/global.typing";
import FacultiesGrid from "../../components/faculty/FacultiesGrid.component";
import FacultyForm from "../../components/faculty/FacultyForm.component";
import Facultieservice from "../../services/FacultyService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";

const Faculties = () => {
  const [Faculties, setFaculties] = useState<IFaculty[]>([]);
  const [FacultyId, setFacultyId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("0");

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const FacultiesData = await Facultieservice.getAllFaculties();
      setFaculties(FacultiesData);
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
    setFacultyId("0");
    openModal();
  };

  const handleClickEditBtn = (FacultyId: string) => {
    setFacultyId(FacultyId);
    openModal();
  };

  const handleSaveSuccess = () => {
    fetchFaculties();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (FacultyId: string) => {
    setDeleteItemId(FacultyId);
    openDeleteDialog();
  };

  const deleteFaculty = async () => {
    try {
      await Facultieservice.deleteFaculty(deleteItemId);
      closeModal();
      fetchFaculties();
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
            <FacultyForm
              FacultyId={FacultyId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : Faculties.length === 0 ? (
        <h1>Không tìm thấy loại hành động nào.</h1>
      ) : (
        <>
          <FacultiesGrid
            data={Faculties}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"loại hành động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteFaculty}
          />
        </>
      )}
    </div>
  );
};

export default Faculties;
