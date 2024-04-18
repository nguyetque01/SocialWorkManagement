import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IAcademicYear } from "../../types/global.typing";
import AcademicYearsGrid from "../../components/academic-years/AcademicYearsGrid.component";
import AcademicYearForm from "../../components/academic-years/AcademicYearForm.component";
import AcademicYearService from "../../services/AcademicYearService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const AcademicYear = () => {
  const [AcademicYears, setAcademicYears] = useState<IAcademicYear[]>([]);
  const [academicYearId, setAcademicYearId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      setLoading(true);
      const AcademicYearsData = await AcademicYearService.getAllAcademicYears();
      setAcademicYears(AcademicYearsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách năm học:", error);
      toast.error("Lỗi khi tải danh sách năm học. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setAcademicYearId(0);
    openModal();
  };

  const handleClickEditBtn = (academicYearId: number) => {
    setAcademicYearId(academicYearId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "AcademicYears",
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

  const handleSaveSuccess = async (newAcademicYearId: number) => {
    if (academicYearId === 0) {
      setAcademicYearId(newAcademicYearId);
      await saveRecordHistory(newAcademicYearId, 1, "Thêm mới năm học");
    } else {
      await saveRecordHistory(academicYearId, 2, "Cập nhật năm học");
    }
    fetchAcademicYears();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (academicYearId: number) => {
    setDeleteItemId(academicYearId);
    openDeleteDialog();
  };

  const deleteAcademicYear = async () => {
    try {
      await AcademicYearService.deleteAcademicYear(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa năm học");
      closeModal();
      fetchAcademicYears();
      toast.success("Năm học đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa năm học:", error);
      toast.error("Lỗi khi xóa năm học. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách năm học</h2>
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
            <AcademicYearForm
              academicYearId={academicYearId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : AcademicYears.length === 0 ? (
        <h1>Không tìm thấy năm học nào.</h1>
      ) : (
        <>
          <AcademicYearsGrid
            data={AcademicYears}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"năm học"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteAcademicYear}
          />
        </>
      )}
    </div>
  );
};

export default AcademicYear;
