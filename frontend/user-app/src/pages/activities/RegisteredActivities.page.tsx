import { useCallback, useEffect, useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import { toast } from "react-toastify";
import { IActivityParticipationDetail } from "../../types/activity-participation.typing";
import RegistedActivitiesGrid from "../../components/activities/RegistedActivitiesGrid.component";
import ActivityParticipationService from "../../services/ActivityParticipationService";
import { useCurrentUserId } from "../../hooks/auth.hook";
import ActivitySessionDetail from "../../components/activities/ActivityParticipationDetail.component";

const RegisteredActivities = () => {
  const currentUserId = useCurrentUserId();
  const [activityParticipations, setActivityParticipations] = useState<
    IActivityParticipationDetail[]
  >([]);
  const [activityParticipationId, setActivityParticipationId] =
    useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const fetchActivityParticipations = useCallback(async () => {
    try {
      setLoading(true);
      const activityParticipationsData =
        await ActivityParticipationService.getActivityParticipationDetailsByStudentId(
          currentUserId
        );
      setActivityParticipations(activityParticipationsData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách hoạt động đã đăng ký:", error);
      toast.error(
        "Lỗi khi tải danh sách hoạt động đã đăng ký. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchActivityParticipations();
  }, [fetchActivityParticipations]);

  const openDetailModal = () => setIsDetailModalOpen(true);

  const closeDetailModal = () => setIsDetailModalOpen(false);

  const handleClickCancelBtn = () => closeDetailModal();

  const handleClickDetailBtn = (activityParticipationId: number) => {
    setActivityParticipationId(activityParticipationId);
    openDetailModal();
  };

  return (
    <div
      className="content"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        className="heading"
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h2>
          Danh sách hoạt động đã đăng ký <br />
          <span style={{ fontSize: 18, fontWeight: 500 }}>
            Đây là các hoạt động bạn đã đăng ký nhưng chưa diễn ra
          </span>
        </h2>
        <Modal
          open={isDetailModalOpen}
          onClose={closeDetailModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-container"
        >
          <div className="modal-content">
            <ActivitySessionDetail
              activityParticipationId={activityParticipationId}
              handleClickCancelBtn={handleClickCancelBtn}
            />
          </div>
        </Modal>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : activityParticipations.length === 0 ? (
        <h1>Bạn chưa đăng ký tham gia hoạt động nào.</h1>
      ) : (
        <>
          <RegistedActivitiesGrid
            data={activityParticipations}
            handleClickDetailBtn={handleClickDetailBtn}
          />
        </>
      )}
    </div>
  );
};

export default RegisteredActivities;
