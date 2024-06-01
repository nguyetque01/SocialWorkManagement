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

interface ILogoutDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const LogoutDialog = ({
  isOpen,
  handleClose,
  handleConfirm,
}: ILogoutDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} className="dialog">
      <DialogTitle className="dialogTitle">Xác nhận đăng xuất</DialogTitle>
      <IconButton className="closeBtn" aria-label="close" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent className="dialogContent" dividers>
        <Typography gutterBottom>Bạn có chắc chắn muốn đăng xuất?</Typography>
      </DialogContent>
      <DialogActions className="dialogActions">
        <Button className="btn btn--cancel" onClick={handleClose}>
          Hủy
        </Button>
        <Button className="btn btn--logout" onClick={handleConfirm}>
          Đăng xuất
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;
