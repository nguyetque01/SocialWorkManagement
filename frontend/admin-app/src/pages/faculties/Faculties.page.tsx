import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IFaculty } from "../../types/global.typing";
import FacultiesGrid from "../../components/faculties/FacultiesGrid.component";
import FacultyForm from "../../components/faculties/FacultyForm.component";
import FacultyService from "../../services/FacultyService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const Faculties = () => {
  const [faculties, setFaculties] = useState<IFaculty[]>([]);
  const [facultyId, setFacultyId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const facultiesData = await FacultyService.getAllFaculties();
      setFaculties(facultiesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khoa:", error);
      toast.error("Lỗi khi tải danh sách khoa. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setFacultyId(0);
    openModal();
  };

  const handleClickEditBtn = (facultyId: number) => {
    setFacultyId(facultyId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "Faculties",
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

  const handleSaveSuccess = async (newFacultyId: number) => {
    if (facultyId === 0) {
      setFacultyId(newFacultyId);
      await saveRecordHistory(newFacultyId, 1, "Thêm mới khoa");
    } else {
      await saveRecordHistory(facultyId, 2, "Cập nhật khoa");
    }
    fetchFaculties();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (facultyId: number) => {
    setDeleteItemId(facultyId);
    openDeleteDialog();
  };

  const deleteFaculty = async () => {
    try {
      await FacultyService.deleteFaculty(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa khoa");
      closeModal();
      fetchFaculties();
      toast.success("khoa đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa khoa:", error);
      toast.error("Lỗi khi xóa khoa. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách khoa</h2>
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
              facultyId={facultyId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : faculties.length === 0 ? (
        <h1>Không tìm thấy khoa nào.</h1>
      ) : (
        <>
          <FacultiesGrid
            data={faculties}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"khoa"}
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
