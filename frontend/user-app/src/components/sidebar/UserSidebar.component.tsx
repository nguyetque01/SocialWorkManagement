import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import LogoutDialog from "../common/dialog/LogoutDialog.component";
import { useState } from "react";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
  const navigate = useNavigate();
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const handleLogoutBtnClick = () => {
    setConfirmLogoutOpen(true);
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
      <Drawer anchor="left" open={isOpen} onClose={onClose}>
        <List>
          <ListItem component={Link} to="/dashboard" onClick={onClose}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/users" onClick={onClose}>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItemButton onClick={handleLogoutBtnClick}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <LogoutDialog
        isOpen={confirmLogoutOpen}
        handleClose={() => setConfirmLogoutOpen(false)}
        handleConfirm={handleLogout}
      />
    </>
  );
};

export default UserSidebar;
