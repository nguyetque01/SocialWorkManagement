import React, { useEffect, useState } from "react";
import { ICreateClass } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ClassService from "../../services/ClassService";
import "../../styles/form.scss";

interface IClassFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: () => void;
  ClassId: string;
}

const ClassForm = ({
  ClassId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IClassFormProps) => {
  const [Class, setClass] = useState<ICreateClass>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = ClassId !== "0";

  useEffect(() => {
    fetchClassData();
  }, [ClassId]);

  const fetchClassData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ClassService.getClassById(ClassId);
        setClass(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu lớp học:", error);
        toast.error("Lỗi khi tải dữ liệu lớp học. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setClass((prevClass) => ({
      ...prevClass,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (Class.name === "") {
      toast.error("Vui lòng nhập tên lớp học!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ClassService.updateClass(ClassId, Class)
      : ClassService.createClass(Class);

    savePromise
      .then(() => {
        toast.success("lớp học đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu lớp học!");
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
            {isEditing ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên lớp học"
                variant="outlined"
                value={Class.name}
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
                value={Class.description}
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

export default ClassForm;
