import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { IActivityParticipationDetail } from "../../types/activity-participation.typing";
import "../../styles/grid.scss";

interface IActivityParticipationsGridProps {
  data: IActivityParticipationDetail[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const ActivityParticipationsGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IActivityParticipationsGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Thao tác",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            color="secondary"
            style={{ marginRight: 8 }}
            onClick={() => handleClickEditBtn(params.row.id)}
          >
            <Edit fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => handleClickDeleteBtn(params.row.id)}
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
    { field: "id", headerName: "ID", width: 80 },
    { field: "studentId", headerName: "ID Sinh viên", width: 80 },
    { field: "studentName", headerName: "Tên Sinh viên", width: 150 },
    { field: "activityId", headerName: "Mã Hoạt động", width: 80 },
    { field: "activityName", headerName: "Tên Hoạt động", width: 150 },
    {
      field: "activitySessionId",
      headerName: "Mã Phiên Hoạt động",
      width: 120,
    },
    { field: "session", headerName: "Phiên", width: 120 },
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
  ];

  return (
    <Box className="grid small" style={{ height: 600, width: '100%', position: 'relative' }}>
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

export default ActivityParticipationsGrid;
