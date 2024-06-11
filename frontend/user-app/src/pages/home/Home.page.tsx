import {
  Grid, 
  Box, 
} from '@mui/material';
import "./home.scss";
import UserSliders from "../../components/slider/UserSliders.component";
import SocialAnnounce from "../../components/social-work-announce/SocialAnnounce.component";
import StudentActivities from '../../components/student-activities/StudentActivities.component';
import Footer from '../../components/footer/Footer.component';

const Home = () => {
  return (
    <div style={{marginTop: "20px", height: "150px"}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
              <UserSliders />
            </Grid>
            <Grid item xs={4}>
              <SocialAnnounce />
            </Grid>
        </Grid>
        <StudentActivities />
        <Footer />
      </Box>
    </div>
  );
};

export default Home;
