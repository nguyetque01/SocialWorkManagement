import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default CustomToastContainer;
