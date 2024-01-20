import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./activities-grid.scss";
import { IActivity } from "../../types/global.typing";
import moment from "moment";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Tên hoạt động", width: 300 },
  { field: "location", headerName: "Địa điểm", width: 300 },
  {
    field: "releaseTime",
    headerName: "Ngày công bố",
    width: 200,
    renderCell: (params) => moment(params.row.releaseTime).format("DD/MM/YYYY"),
  },
  { field: "description", headerName: "Mô tả", width: 300 },
];

interface IActivitiesGridProps {
  data: IActivity[];
}

const ActivitiesGrid = ({ data }: IActivitiesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="activities-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default ActivitiesGrid;
