import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { IPermission } from "../../types/global.typing";
import "../../styles/grid.scss";

interface IPermissionsGridProps {
  data: IPermission[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const PermissionsGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IPermissionsGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Tên", width: 150 },
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
    },
  ];

  return (
    <Box className="grid small" style={{ height: 600, width: '100%', position: 'relative' }}>
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
        autoHeight={false}
      />
    </Box>
  );
};

export default PermissionsGrid;
