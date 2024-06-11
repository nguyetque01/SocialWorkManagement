import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider } from '@mui/material';
import { IActivityDetail } from "../../types/activity.typing";
import ActivityService from "../../services/ActivityService";
import { toast } from "react-toastify";

const SocialAnnounce = () => {
  const [activities, setActivities] = useState<IActivityDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchActivities();
  }, []);
  
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const activitiesData = await ActivityService.getAllActivityDetails();
      const sortedActivities = activitiesData
        .filter(activity => activity.activityStartDate !== null && activity.activityStartDate !== undefined)
        .sort((a, b) => new Date(b.activityStartDate!).getTime() - new Date(a.activityStartDate!).getTime());
      setActivities(sortedActivities.slice(0, 6)); // Only keep the 6 most recent activities
    } catch (error) {
      console.error("Lỗi khi tải danh sách hoạt động:", error);
      toast.error("Lỗi khi tải danh sách hoạt động. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginLeft: "5px"}}>
      <Typography style={{ 
          fontWeight: "bold", 
          color: "#AC1F24", 
          fontSize: 28, 
          marginBottom: "10px", 
        }}>
          Hoạt Động
      </Typography>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12}>
            <Typography>Đang tải...</Typography>
          </Grid>
        ) : (
          activities.map((activity, index) => (
            <React.Fragment key={index}>
              <Grid item xs={2} className="notification-date">
                <div style={{ 
                    border: "1px solid blue", 
                    fontSize: "18px", 
                    textAlign: "center", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    marginBottom: "5px", 
                  }}>
                  <span className="caltop" style={{ color: "red" }}>
                    {activity.activityStartDate && new Date(activity.activityStartDate).getDate()}
                  </span>
                  <Divider style={{ margin: "5px 0", backgroundColor: "blue" }} />
                  <span className="calbot">{activity.activityStartDate && `${new Date(activity.activityStartDate).getMonth() + 1}/${new Date(activity.activityStartDate).getFullYear()}`}</span>
                </div>
              </Grid>
              <Grid item xs={10}>
                <div className="notification-header" style={{ marginBottom: "10px" }}>
                  <h3 style={{ color: "black", marginBottom: "5px", fontSize: "18px" }}>
                    {activity.name}
                  </h3>
                </div>
              </Grid>
            </React.Fragment>
          ))
        )}
      </Grid>
    </div>
  );
};

export default SocialAnnounce;
