import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { IFaculty } from "../../types/global.typing";
import "../../styles/grid.scss";

interface IFacultiesGridProps {
  data: IFaculty[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const FacultiesGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IFacultiesGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Tên", width: 300 },
    { field: "description", headerName: "Mô tả", width: 300 },
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

export default FacultiesGrid;