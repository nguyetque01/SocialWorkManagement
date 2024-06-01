import React, { useCallback, useEffect, useState } from "react";
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
  facultyId: number;
}

const FacultyForm = ({
  facultyId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IFacultyFormProps) => {
  const [faculty, setFaculty] = useState<ICreateFaculty>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = facultyId !== 0;

  const fetchFacultyData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await FacultyService.getFacultyById(facultyId);
        setFaculty(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khoa:", error);
        toast.error("Lỗi khi tải dữ liệu khoa. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, facultyId]);

  useEffect(() => {
    fetchFacultyData();
  }, [fetchFacultyData]);

  const handleInputChange = (field: string, value: string) => {
    setFaculty((prevFaculty) => ({
      ...prevFaculty,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (faculty.name === "") {
      toast.error("Vui lòng nhập tên khoa!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? FacultyService.updateFaculty(facultyId, faculty)
      : FacultyService.createFaculty(faculty);

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
                value={faculty.name}
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
                value={faculty.description}
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
