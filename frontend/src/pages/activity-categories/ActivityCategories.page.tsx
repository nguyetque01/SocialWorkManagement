import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Modal } from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { IActivityCategory } from "../../types/global.typing";
import ActivityCategoriesGrid from "../../components/activity-categories/ActivityCategoriesGrid.component";
import ActivityCategoryForm from "../../components/activity-categories/ActivityCategoryForm.component";
import ActivityCategorieservice from "../../services/ActivityCategoryService";
import DeleteDialog from "../../components/common/dialog/DeleteDialog.component";

const ActivityCategories = () => {
  const [ActivityCategories, setActivityCategories] = useState<
    IActivityCategory[]
  >([]);
  const [ActivityCategoryId, setActivityCategoryId] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string>("0");

  useEffect(() => {
    fetchActivityCategories();
  }, []);

  const fetchActivityCategories = async () => {
    try {
      setLoading(true);
      const ActivityCategoriesData =
        await ActivityCategorieservice.getAllActivityCategories();
      setActivityCategories(ActivityCategoriesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục hoạt động:", error);
      toast.error(
        "Lỗi khi tải danh sách danh mục hoạt động. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickAddBtn = () => {
    setActivityCategoryId("0");
    openModal();
  };

  const handleClickEditBtn = (ActivityCategoryId: string) => {
    setActivityCategoryId(ActivityCategoryId);
    openModal();
  };

  const handleSaveSuccess = () => {
    fetchActivityCategories();
  };

  const handleClickCancelBtn = () => closeModal();

  const handleClickDeleteBtn = async (ActivityCategoryId: string) => {
    setDeleteItemId(ActivityCategoryId);
    openDeleteDialog();
  };

  const deleteActivityCategory = async () => {
    try {
      await ActivityCategorieservice.deleteActivityCategory(deleteItemId);
      closeModal();
      fetchActivityCategories();
      toast.success("danh mục hoạt động đã được xóa thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa danh mục hoạt động:", error);
      toast.error("Lỗi khi xóa danh mục hoạt động. Vui lòng thử lại.");
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <div className="content">
      <div className="heading">
        <h2>Danh sách danh mục hoạt động</h2>
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
            <ActivityCategoryForm
              ActivityCategoryId={ActivityCategoryId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : ActivityCategories.length === 0 ? (
        <h1>Không tìm thấy danh mục hoạt động nào.</h1>
      ) : (
        <>
          <ActivityCategoriesGrid
            data={ActivityCategories}
            handleClickEditBtn={handleClickEditBtn}
            handleClickDeleteBtn={handleClickDeleteBtn}
          />
          <DeleteDialog
            item={"danh mục hoạt động"}
            isOpen={isDeleteDialogOpen}
            handleClose={() => setIsDeleteDialogOpen(false)}
            handleConfirm={deleteActivityCategory}
          />
        </>
      )}
    </div>
  );
};

export default ActivityCategories;
