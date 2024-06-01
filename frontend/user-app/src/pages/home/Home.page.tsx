import { Box } from "@mui/material";
import "./home.scss";
import UserSliders from "../../components/slider/UserSliders.component";

const Home = () => {
  return (
    <div>
      <UserSliders />
      <Box className="content"></Box>
    </div>
  );
};

export default Home;
