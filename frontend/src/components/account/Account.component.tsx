import React, { useState, useContext } from "react";
import {
  IconButton,
  Box,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  ListItemButton,
} from "@mui/material";
import {
  AccountCircle,
  Person,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import { AuthContext } from "../../context/auth.context";
import AuthService from "../../services/AuthService";
import LogoutDialog from "../common/dialog/LogoutDialog.component";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }

  const { user } = authContext;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogoutBtnClick = () => {
    setConfirmLogoutOpen(true);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="account of current user"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handlePopoverOpen}
      >
        <Avatar>
          <AccountCircle />
        </Avatar>
      </IconButton>
      <Popover
        id="account-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user?.fullName || "Guest"}
                secondary={user?.email}
              />
            </ListItem>

            <Divider />

            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Trang cá nhân" />
            </ListItemButton>

            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <Settings />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cài đặt" />
            </ListItemButton>

            <Divider />

            <ListItemButton onClick={handleLogoutBtnClick}>
              <ListItemAvatar>
                <Avatar>
                  <ExitToApp />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Đăng xuất" />
            </ListItemButton>
          </List>
        </Box>
      </Popover>

      <LogoutDialog
        isOpen={confirmLogoutOpen}
        handleClose={() => setConfirmLogoutOpen(false)}
        handleConfirm={handleLogout}
      />
    </>
  );
};

export default Account;
