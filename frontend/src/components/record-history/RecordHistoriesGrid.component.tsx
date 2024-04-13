import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IActionType, IRecordHistory } from "../../types/global.typing";
import "../../styles/grid.scss";

interface IRecordHistoriesGridProps {
  data: IRecordHistory[];
  actionTypes: IActionType[];
}

const RecordHistoriesGrid = ({
  data,
  actionTypes,
}: IRecordHistoriesGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const getActionTypeName = (actionTypeId: number) => {
    const actionType = actionTypes.find((type) => type.id === actionTypeId);
    return actionType ? actionType.name : "";
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "tableName", headerName: "Tên Bảng", width: 150 },
    { field: "recordId", headerName: "ID Bản Ghi", width: 150 },
    {
      field: "actionTypeId",
      headerName: "Loại Hành Động",
      width: 150,
      valueGetter: (params) => getActionTypeName(params.row.actionTypeId || 0),
    },
    { field: "actorId", headerName: "ID Người Thực Hiện", width: 150 },
    { field: "actionTime", headerName: "Thời Gian Hành Động", width: 200 },
    { field: "description", headerName: "Mô Tả", width: 150 },
    { field: "deviceUsed", headerName: "Thiết Bị Sử Dụng", width: 150 },
    { field: "location", headerName: "Vị Trí", width: 150 },
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

export default RecordHistoriesGrid;
