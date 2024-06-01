import { useEffect, useState } from "react";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { IActivity } from "../../types/global.typing";
import ActivitiesGrid from "../../components/activities/ActivitiesGrid.component";
import ActivityRegistrationForm from "../../components/activities/ActivityRegistrationForm.component";
import ActivityService from "../../services/ActivityService";
import "../../styles/page.scss";

const Activities = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activityId, setActivityId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 7);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const activitiesData = await ActivityService.getAllActivities();
      setActivities(activitiesData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách hoạt động:", error);
      toast.error("Lỗi khi tải danh sách hoạt động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleClickRegisterBtn = (activityId: number) => {
    setActivityId(activityId);
    openModal();
  };

  const handleSaveSuccess = async (newActivityId: number) => {};

  const handleClickCancelBtn = () => closeModal();

  return (
    <div className="content">
      <div className="heading">
        <p className="title">Danh sách hoạt động</p>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-container"
        >
          <div className="modal-content">
            <ActivityRegistrationForm
              activityId={activityId}
              onSaveSuccess={handleSaveSuccess}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : activities.length === 0 ? (
        <h1>Không tìm thấy hoạt động nào.</h1>
      ) : (
        <ActivitiesGrid
          data={activities}
          handleClickRegisterBtn={handleClickRegisterBtn}
        />
      )}
    </div>
  );
};

export default Activities;
