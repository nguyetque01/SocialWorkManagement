import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { IActivitySessionDetail } from "../../types/activity-session.typing";
import "../../styles/grid.scss";

interface IActivitySessionsGridProps {
  data: IActivitySessionDetail[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const ActivitySessionsGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IActivitySessionsGridProps) => {
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
    { field: "activity", headerName: "Hoạt động", width: 300 },
    { field: "activityDate", headerName: "Ngày Hoạt Động", width: 150 },
    { field: "session", headerName: "Buổi", width: 150 },
    { field: "startTime", headerName: "Thời Gian Bắt Đầu", width: 150 },
    { field: "endTime", headerName: "Thời Gian Kết Thúc", width: 150 },
    { field: "daysCount", headerName: "Số Ngày", width: 80 },
    { field: "maxParticipants", headerName: "Số Lượng Tối Đa", width: 80 },
    {
      field: "registrationStartTime",
      headerName: "Thời Gian Bắt Đầu Đăng Ký",
      width: 200,
    },
    {
      field: "registrationEndTime",
      headerName: "Thời Gian Kết Thúc Đăng Ký",
      width: 200,
    },
    {
      field: "registrationAcceptanceStatusText",
      headerName: "Trạng Thái Chấp Nhận Đăng Ký",
      width: 220,
    },
    { field: "statusText", headerName: "Trạng Thái", width: 150 },
    { field: "description", headerName: "Mô tả", width: 200 },
  ];

  return (
    <Box className="grid small">
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
      />
    </Box>
  );
};

export default ActivitySessionsGrid;
