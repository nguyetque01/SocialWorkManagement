import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EditNote, Visibility } from "@mui/icons-material";
import moment from "moment";
import { IActivityDetail } from "../../types/activity.typing";
import "../../styles/grid.scss";

interface IActivitiesGridProps {
  data: IActivityDetail[];
  handleClickRegisterBtn: (id: number) => void;
  handleClickDetailBtn: (id: number) => void;
}

const ActivitiesGrid = ({
  data,
  handleClickRegisterBtn,
  handleClickDetailBtn,
}: IActivitiesGridProps) => {
  const sortedData = [...data]
    .sort((a, b) => {
      return moment(b.releaseTime).valueOf() - moment(a.releaseTime).valueOf();
    })
    .map((item, index) => ({ ...item, order: index + 1 }));

  const columns: GridColDef[] = [
    {
      field: "order",
      headerName: "STT",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    { field: "name", headerName: "Tên hoạt động", width: 300 },
    { field: "location", headerName: "Địa điểm", width: 200 },
    { field: "activityCategory", headerName: "Danh mục hoạt động", width: 150 },
    {
      field: "activityStartDate",
      headerName: "Ngày bắt đầu",
      width: 100,
      renderCell: (params) =>
        moment(params.row.activityStartDate).format("DD/MM/YYYY"),
    },
    {
      field: "activityEndDate",
      headerName: "Ngày kết thúc",
      width: 100,
      renderCell: (params) =>
        moment(params.row.activityEndDate).format("DD/MM/YYYY"),
    },
    {
      field: "registrationEndTime",
      headerName: "Hạn đăng ký",
      width: 100,
      renderCell: (params) =>
        moment(params.row.registrationEndTime).format("DD/MM/YYYY"),
    },
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
    {
      field: "register",
      headerName: "Đăng ký",
      width: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            size="small"
            color="secondary"
            onClick={() => handleClickRegisterBtn(params.row.id)}
          >
            <EditNote fontSize="inherit" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box className="grid">
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
        pageSizeOptions={[5, 15, 20]}
        getRowId={(row) => row.id}
        rowHeight={50}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ActivitiesGrid;
