import React, { useEffect, useState } from "react";
import { ICreateFaculty } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import FacultyService from "../../services/FacultyService";
import "../../styles/form.scss";

interface IFacultyFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: (newFaculty: number) => void;
  FacultyId: number;
}

const FacultyForm = ({
  FacultyId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IFacultyFormProps) => {
  const [Faculty, setFaculty] = useState<ICreateFaculty>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = FacultyId !== 0;

  useEffect(() => {
    fetchFacultyData();
  }, [FacultyId]);

  const fetchFacultyData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await FacultyService.getFacultyById(FacultyId);
        setFaculty(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khoa:", error);
        toast.error("Lỗi khi tải dữ liệu khoa. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFaculty((prevFaculty) => ({
      ...prevFaculty,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (Faculty.name === "") {
      toast.error("Vui lòng nhập tên khoa!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? FacultyService.updateFaculty(FacultyId, Faculty)
      : FacultyService.createFaculty(Faculty);

    savePromise
      .then((newFaculty) => {
        const newFacultyId = newFaculty?.id || 0;
        toast.success("khoa đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newFacultyId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu khoa!");
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
            {isEditing ? "Chỉnh sửa khoa" : "Thêm khoa mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên khoa"
                variant="outlined"
                value={Faculty.name}
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
                value={Faculty.description}
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

export default FacultyForm;
