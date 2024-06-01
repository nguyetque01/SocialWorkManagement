import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../../../styles/dialog.scss";

interface IDeleteDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  item: string;
}

const DeleteDialog = ({
  isOpen,
  handleClose,
  handleConfirm,
  item,
}: IDeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} className="dialog">
      <DialogTitle className="dialogTitle">Xác nhận xóa {item} </DialogTitle>
      <IconButton className="closeBtn" aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent className="dialogContent" dividers>
        <Typography gutterBottom>
          Bạn có chắc chắn muốn xóa {item} này?
        </Typography>
      </DialogContent>
      <DialogActions className="dialogActions">
        <Button className="btn btn--cancel" onClick={handleClose}>
          Hủy
        </Button>
        <Button className="btn btn--delete" onClick={handleConfirm}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
