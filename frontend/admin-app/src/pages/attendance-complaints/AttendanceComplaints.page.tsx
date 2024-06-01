import React, { useEffect, useState, useContext } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IAttendanceComplaint } from "../../types/global.typing";
import AttendanceComplaintsGrid from "../../components/attendance-complaints/AttendanceComplaintsGrid.component";
import AttendanceComplaintForm from "../../components/attendance-complaints/AttendanceComplaintForm.component";
import AttendanceComplaintService from "../../services/AttendanceComplaintService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";
import RecordHistoryService from "../../services/RecordHistoryService";
import { MainContext } from "../../context/main.context";

const AttendanceComplaints = () => {
  const [attendanceComplaints, setAttendanceComplaints] = useState<IAttendanceComplaint[]>([]);
  const [attendanceComplaintId, setAttendanceComplaintId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<number>(0);
  const { city, country, device } = useContext(MainContext);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchAttendanceComplaints();
  }, []);

  const fetchAttendanceComplaints = async () => {
    try {
      setLoading(true);
      const attendanceComplaintsData = await AttendanceComplaintService.getAllAttendanceComplaints();
      setAttendanceComplaints(attendanceComplaintsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khiếu nại:", error);
      toast.error("Lỗi khi tải danh sách khiếu nại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setAttendanceComplaintId(0);
    openModal();
  };

  const handleClickEditBtn = (attendanceComplaintId: number) => {
    setAttendanceComplaintId(attendanceComplaintId);
    openModal();
  };

  const saveRecordHistory = async (
    recordId: number,
    actionTypeId: number,
    description: string
  ) => {
    try {
      await RecordHistoryService.createRecordHistory({
        tableName: "AttendanceComplaints",
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

  const handleSaveSuccess = async (newAttendanceComplaintId: number) => {
    if (attendanceComplaintId === 0) {
      setAttendanceComplaintId(newAttendanceComplaintId);
      await saveRecordHistory(newAttendanceComplaintId, 1, "Thêm mới khiếu nại");
    } else {
      await saveRecordHistory(attendanceComplaintId, 2, "Cập nhật khiếu nại");
    }
    fetchAttendanceComplaints();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (attendanceComplaintId: number) => {
    setDeleteItemId(attendanceComplaintId);
    openDeleteDialog();
  };

  const deleteAttendanceComplaint = async () => {
    try {
      await AttendanceComplaintService.deleteAttendanceComplaint(deleteItemId);
      await saveRecordHistory(deleteItemId, 3, "Xóa khiếu nại");
      closeModal();
      fetchAttendanceComplaints();
      toast.success("khiếu nại đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa khiếu nại:", error);
      toast.error("Lỗi khi xóa khiếu nại. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách khiếu nại</h2>
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
            <AttendanceComplaintForm
              attendanceComplaintId={attendanceComplaintId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : attendanceComplaints.length === 0 ? (
        <h1>Không tìm thấy khiếu nại nào.</h1>
      ) : (
        <>
          <AttendanceComplaintsGrid
            data={attendanceComplaints}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"khiếu nại"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteAttendanceComplaint}
          />
        </>
      )}
    </div>
  );
};

export default AttendanceComplaints;
