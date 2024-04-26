import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { IUserDetail } from "../../types/global.typing";
import "../../styles/grid.scss";

interface IUsersGridProps {
  data: IUserDetail[];
  handleClickEditBtn: (id: number) => void;
  handleClickDeleteBtn: (id: number) => void;
}

const UsersGrid = ({
  data,
  handleClickEditBtn,
  handleClickDeleteBtn,
}: IUsersGridProps) => {
  const sortedData = [...data].sort((a, b) => {
    return b.id - a.id;
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "fullName", headerName: "Họ tên", width: 150 },
    {
      field: "dateOfBirth",
      headerName: "Ngày sinh",
      width: 150,
      renderCell: (params) =>
        moment(params.row.dateOfBirth).format("DD/MM/YYYY"),
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 150,
      renderCell: (params) => {
        const gender = params.row.gender;
        return gender === "Male"
          ? "Nam"
          : gender === "Female"
          ? "Nữ"
          : "Không xác định";
      },
    },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "phoneNumber", headerName: "Điện thoại", width: 150 },
    { field: "roleId", headerName: "ID Vai trò", width: 150 },
    { field: "facultyId", headerName: "ID Khoa", width: 150 },
    { field: "classId", headerName: "ID Lớp", width: 150 },
    { field: "status", headerName: "Trạng thái", width: 150 },
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

export default UsersGrid;
