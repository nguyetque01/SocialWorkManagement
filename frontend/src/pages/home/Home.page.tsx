import { Box } from "@mui/material";
import "./home.scss";
import UserSliders from "../../components/UI/user-dashboard/user-sliders/UserSliders.component";

const Home = () => {
  return (
    <div>
      <UserSliders />
      <Box className="content"></Box>
    </div>
  );
};

export default Home;
