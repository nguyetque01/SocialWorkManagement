import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { IActivityDetail } from "../../types/activity.typing";
import "../../styles/grid.scss";

interface IActivitiesGridProps {
  data: IActivityDetail[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const ActivitiesGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IActivitiesGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return moment(b.releaseTime).valueOf() - moment(a.releaseTime).valueOf();
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Tên hoạt động", width: 400 },
    { field: "location", headerName: "Địa điểm", width: 200 },
    { field: "academicYear", headerName: "Năm học", width: 150 },
    { field: "activityCategory", headerName: "Danh mục hoạt động", width: 150 },
    { field: "totalDays", headerName: "Tổng số ngày CTXH", width: 150 },
    {
      field: "releaseTime",
      headerName: "Thời gian công bố",
      width: 200,
      renderCell: (params) =>
        moment(params.row.releaseTime).format("DD/MM/YYYY HH:mm A"),
    },
    { field: "statusText", headerName: "Trạng thái", width: 150 },
    { field: "description", headerName: "Mô tả", width: 150 },
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
      cellClassName: 'sticky-column', //add this line
    },
  ];

  return (
    <Box className="grid" style={{ height: 600, width: '100%', position: 'relative' }}>
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

export default ActivitiesGrid;
