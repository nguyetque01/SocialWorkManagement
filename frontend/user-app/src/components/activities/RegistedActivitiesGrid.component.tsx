import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { IActivityParticipationDetail } from "../../types/activity-participation.typing";
import "../../styles/grid.scss";

interface IRegistedActivitiesGridProps {
  data: IActivityParticipationDetail[];
  handleClickDetailBtn: (id: number) => void;
}

const RegistedActivitiesGrid = ({
  data,
  handleClickDetailBtn,
}: IRegistedActivitiesGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "activityName", headerName: "Tên Hoạt động", width: 150 },
    {
      field: "activitySessionId",
      headerName: "Mã buổi Hoạt động",
      width: 120,
    },
    { field: "session", headerName: "Buổi", width: 120 },
    { field: "startTime", headerName: "Thời gian Bắt đầu", width: 150 },
    { field: "endTime", headerName: "Thời gian Kết thúc", width: 150 },
    { field: "daysCount", headerName: "Số ngày", width: 100 },
    { field: "statusText", headerName: "Trạng thái", width: 120 },
    {
      field: "registrationStatusText",
      headerName: "Trạng thái Đăng ký",
      width: 180,
    },
    {
      field: "attendanceStatusText",
      headerName: "Trạng thái Tham gia",
      width: 180,
    },
    {
      field: "approvalAttendanceStatusText",
      headerName: "Trạng thái Chấp nhận Tham gia",
      width: 220,
    },
    { field: "description", headerName: "Mô tả", width: 150 },
    {
      field: "detail",
      headerName: "Chi tiết",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="detail"
            size="small"
            color="primary"
            onClick={() => handleClickDetailBtn(params.row.id)}
          >
            <Visibility fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      className="grid small"
      style={{ height: 600, width: "100%", position: "relative" }}
    >
      <DataGrid
        rows={sortedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        getRowId={(row) => row.id}
        rowHeight={50}
        disableRowSelectionOnClick
        autoHeight={false}
      />
    </Box>
  );
};

export default RegistedActivitiesGrid;
