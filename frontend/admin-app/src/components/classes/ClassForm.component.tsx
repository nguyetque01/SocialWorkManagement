import { useEffect, useState, useCallback } from "react";
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
  onSaveSuccess: (newClass: number) => void;
  classId: number;
}

const ClassForm = ({
  classId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IClassFormProps) => {
  const [Class, setClass] = useState<ICreateClass>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = classId !== 0;

  const fetchClassData = useCallback(async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ClassService.getClassById(classId);
        setClass(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu loại hành động:", error);
        toast.error("Lỗi khi tải dữ liệu loại hành động. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  }, [isEditing, classId]);

  useEffect(() => {
    fetchClassData();
  }, [fetchClassData]);

  const handleInputChange = (field: string, value: string) => {
    setClass((prevClass) => ({
      ...prevClass,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (Class.name === "") {
      toast.error("Vui lòng nhập tên loại hành động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ClassService.updateClass(classId, Class)
      : ClassService.createClass(Class);

    savePromise
      .then((newClass) => {
        const newclassId = newClass?.id || 0;
        toast.success("Loại hành động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess(newclassId);
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
