import React, { useEffect, useState } from "react";
import { ICreateActivityCategory } from "../../types/global.typing";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import ActivityCategoryService from "../../services/ActivityCategoryService";
import "../../styles/form.scss";

interface IActivityCategoryFormProps {
  handleClickCancelBtn: () => void;
  onSaveSuccess: () => void;
  ActivityCategoryId: string;
}

const ActivityCategoryForm = ({
  ActivityCategoryId,
  onSaveSuccess,
  handleClickCancelBtn,
}: IActivityCategoryFormProps) => {
  const [ActivityCategory, setActivityCategory] = useState<ICreateActivityCategory>({
    name: "",
    status: 0,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditing = ActivityCategoryId !== "0";

  useEffect(() => {
    fetchActivityCategoryData();
  }, [ActivityCategoryId]);

  const fetchActivityCategoryData = async () => {
    if (isEditing) {
      try {
        // setLoading(true);
        const data = await ActivityCategoryService.getActivityCategoryById(ActivityCategoryId);
        setActivityCategory(data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu danh mục hoạt động:", error);
        toast.error("Lỗi khi tải dữ liệu danh mục hoạt động. Vui lòng thử lại!");
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setActivityCategory((prevActivityCategory) => ({
      ...prevActivityCategory,
      [field]: value,
    }));
  };

  const handleClickSaveBtn = () => {
    if (ActivityCategory.name === "") {
      toast.error("Vui lòng nhập tên danh mục hoạt động!");
      return;
    }

    setLoading(true);

    const savePromise = isEditing
      ? ActivityCategoryService.updateActivityCategory(ActivityCategoryId, ActivityCategory)
      : ActivityCategoryService.createActivityCategory(ActivityCategory);

    savePromise
      .then(() => {
        toast.success("danh mục hoạt động đã được lưu thành công!");
        handleClickCancelBtn();
        onSaveSuccess();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Đã xảy ra lỗi khi lưu danh mục hoạt động!");
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
            {isEditing ? "Chỉnh sửa danh mục hoạt động" : "Thêm danh mục hoạt động mới"}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên danh mục hoạt động"
                variant="outlined"
                value={ActivityCategory.name}
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
                value={ActivityCategory.description}
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

export default ActivityCategoryForm;
