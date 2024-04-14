import React, { useEffect, useState } from "react";
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
  onSaveSuccess: () => void;
  AcademicYearId: string;
}

const AcademicYearForm = ({
  AcademicYearId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IAcademicYearFormProps) => {
  const [AcademicYear, setAcademicYear] = useState<ICreateAcademicYear>({
    name: "",
    starttime: new Date(),
    endtime: new Date(),
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = AcademicYearId !== "0";

  useEffect(() => {
    fetchAcademicYearData();
  }, [AcademicYearId]);

  const fetchAcademicYearData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await AcademicYearService.getAcademicYearById(AcademicYearId);
        setAcademicYear(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu loại hành động:", error);
        toast.error("Lỗi khi tải dữ liệu loại hành động. Vui lòng thử lại!");
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
    if (AcademicYear.name === "") {
      toast.error("Vui lòng nhập tên loại hành động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? AcademicYearService.updateAcademicYear(AcademicYearId, AcademicYear)
      : AcademicYearService.createAcademicYear(AcademicYear);

    savePromise
      .then(() => {
        toast.success("loại hành động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu loại hành động!");
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
            {isEditing ? "Chỉnh sửa loại hành động" : "Thêm loại hành động mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên loại hành động"
                variant="outlined"
                value={AcademicYear.name}
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
                value={AcademicYear.description}
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
