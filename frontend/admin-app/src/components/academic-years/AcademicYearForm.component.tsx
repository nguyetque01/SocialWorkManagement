import { useEffect, useState } from "react";
import { ICreateAcademicYear } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import AcademicYearService from "../../services/AcademicYearService";
import "../../styles/form.scss";

interface IAcademicYearFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newAcademicYear: number) => void;
  academicYearId: number;
}

const AcademicYearForm = ({
  academicYearId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IAcademicYearFormProps) => {
  const [academicYear, setAcademicYear] = useState<ICreateAcademicYear>({
    name: "",
    starttime: new Date(),
    endtime: new Date(),
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = academicYearId !== 0;

  useEffect(() => {
    fetchAcademicYearData();
  }, [academicYearId]);

  const fetchAcademicYearData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await AcademicYearService.getAcademicYearById(
          academicYearId
        );
        setAcademicYear(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu năm học:", error);
        toast.error("Lỗi khi tải dữ liệu năm học. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setAcademicYear((prevAcademicYear) => ({
      ...prevAcademicYear,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (academicYear.name === "") {
      toast.error("Vui lòng nhập tên năm học!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? AcademicYearService.updateAcademicYear(academicYearId, academicYear)
      : AcademicYearService.createAcademicYear(academicYear);

    savePromise
      .then((newAcademicYear) => {
        const newAcademicYearId = newAcademicYear?.id || 0;
        handleClickCancelBtn();
        onSaveSuccess(newAcademicYearId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu năm học!");
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
            {isEditing ? "Chỉnh sửa năm học" : "Thêm năm học mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên năm học"
                variant="outlined"
                value={academicYear.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Mô tả"
                variant="outlined"
                value={academicYear.description}
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

export default AcademicYearForm;
