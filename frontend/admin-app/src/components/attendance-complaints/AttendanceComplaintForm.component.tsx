import { useEffect, useState, useCallback } from "react";
import { ICreateAttendanceComplaint } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import AttendanceComplaintService from "../../services/AttendanceComplaintService";
import "../../styles/form.scss";

interface IAttendanceComplaintFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newAttendanceComplaint: number) => void;
  attendanceComplaintId: number;
}

const AttendanceComplaintForm = ({
  attendanceComplaintId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IAttendanceComplaintFormProps) => {
  const [AttendanceComplaint, setAttendanceComplaint] =
    useState<ICreateAttendanceComplaint>({
      //name: "",
      status: 0,
      description: "",
    });

  const [loading, setLoading] = useState(false);
  const isEditing = attendanceComplaintId !== 0;

  const fetchAttendanceComplaintData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data =
          await AttendanceComplaintService.getAttendanceComplaintById(
            attendanceComplaintId
          );
        setAttendanceComplaint(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khiếu nại:", error);
        toast.error("Lỗi khi tải dữ liệu khiếu nại. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, attendanceComplaintId]);

  useEffect(() => {
    fetchAttendanceComplaintData();
  }, [fetchAttendanceComplaintData]);

  const handleInputChange = (field: string, value: string) => {
    setAttendanceComplaint((prevAttendanceComplaint) => ({
      ...prevAttendanceComplaint,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    // if (AttendanceComplaint.name === "") {
    //   toast.error("Vui lòng nhập tên khiếu nại!");
    //   return;
    // }

    setLoading(true);

    const savePromise = isEditing
      ? AttendanceComplaintService.updateAttendanceComplaint(
          attendanceComplaintId,
          AttendanceComplaint
        )
      : AttendanceComplaintService.createAttendanceComplaint(
          AttendanceComplaint
        );

    savePromise
      .then((newAttendanceComplaint) => {
        const newattendanceComplaintId = newAttendanceComplaint?.id || 0;
        toast.success("khiếu nại đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newattendanceComplaintId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu khiếu nại!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {isEditing && loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <Paper elevation={3} className="form">
          <Typography variant="h5" gutterBottom>
            {isEditing ? "Chỉnh sửa khiếu nại" : "Thêm khiếu nại mới"}
          </Typography>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên khiếu nại"
                variant="outlined"
                value={AttendanceComplaint.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={AttendanceComplaint.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Grid>
          </Grid>
          <div className="btns">
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={handleClickCancelBtn}
            >
              Hủy
            </Button>
            <Button
              className="save-btn"
              variant="contained"
              onClick={handleClickSaveBtn}
            >
              Lưu
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
};

export default AttendanceComplaintForm;
