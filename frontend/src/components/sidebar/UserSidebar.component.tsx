import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserSidebar = ({ isOpen, onClose }: UserSidebarProps) => {
  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose}>
      <List>
        <ListItem component={Link} to="/User/dashboard" onClick={onClose}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/User/users" onClick={onClose}>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default UserSidebar;
