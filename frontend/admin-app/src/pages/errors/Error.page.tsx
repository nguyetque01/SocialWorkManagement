import React from "react";
import { Typography, Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

interface ErrorProps {
  errorCode: number;
}

const Error: React.FC<ErrorProps> = ({ errorCode }) => {
  let errorMessage = "";

  switch (errorCode) {
    case 404:
      errorMessage = "404 - Không tìm thấy";
      break;
    case 403:
      errorMessage = "403 - Bị từ chối truy cập";
      break;
    case 401:
      errorMessage = "401 - Không được ủy quyền";
      break;
    case 500:
      errorMessage = "500 - Lỗi máy chủ nội bộ";
      break;
    case 503:
      errorMessage = "503 - Dịch vụ không khả dụng";
      break;
    default:
      errorMessage = "Đã xảy ra lỗi";
      break;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <ErrorOutline sx={{ fontSize: "4rem", color: "error.main" }} />
      <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
        {errorMessage}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Xin lỗi, đã xảy ra lỗi khi truy cập trang.
      </Typography>
    </Box>
  );
};

export default Error;
