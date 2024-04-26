import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { INotification, INotificationType } from "../../types/global.typing";
import { getNotificationTypeName } from "../../utils/global.utils";
import "../../styles/grid.scss";

interface INotificationsGridProps {
  data: INotification[];
  notificationTypes: INotificationType[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const NotificationsGrid = ({
  data,
  notificationTypes,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: INotificationsGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Tiêu đề", width: 150 },
    { field: "content", headerName: "Nội dung", width: 200 },
    {
      field: "typeId",
      headerName: "Loại thông báo",
      width: 200,
      valueGetter: (params) =>
        getNotificationTypeName(notificationTypes, params.row.typeId || 0),
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

export default NotificationsGrid;
