import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { IPermission, IRole, IRolePermission } from "../../types/global.typing";
import { getPermissionName, getRoleName } from "../../utils/global.utils";
import "../../styles/grid.scss";

interface IRolePermissionsGridProps {
  data: IRolePermission[];
  roles: IRole[];
  permissions: IPermission[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const RolePermissionsGrid = ({
  data,
  roles,
  permissions,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IRolePermissionsGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "roleId",
      headerName: "Vai trò",
      width: 150,
      valueGetter: (params) => getRoleName(roles, params.row.roleId || 0),
    },
    {
      field: "permissionId",
      headerName: "Quyền hạn",
      width: 150,
      valueGetter: (params) =>
        getPermissionName(permissions, params.row.permissionId || 0),
    },
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

export default RolePermissionsGrid;
