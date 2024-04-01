import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { IActivity } from "../../types/global.typing";
import "../../styles/grid.scss";

interface IActivitiesGridProps {
  data: IActivity[];
  handleClickEditBtn: (id: string) => void;
  handleClickDeleteBtn: (id: string) => void;
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
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Tên hoạt động", width: 500 },
    { field: "location", headerName: "Địa điểm", width: 200 },
    {
      field: "releaseTime",
      headerName: "Thời gian công bố",
      width: 200,
      renderCell: (params) =>
        moment(params.row.releaseTime).format("DD/MM/YYYY HH:mm A"),
    },
    { field: "description", headerName: "Mô tả", width: 200 },
    {
      field: "actions",
      headerName: "",
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
  ];

  return (
    <Box className="grid">
      <DataGrid
        rows={sortedData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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

export default ActivitiesGrid;
