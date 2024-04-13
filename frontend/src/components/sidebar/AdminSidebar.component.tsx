import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Login,
  Person,
  Timeline,
  Notifications,
  Settings,
  Category,
  Event,
  Group,
  School,
  History,
} from "@mui/icons-material";
import { imagePaths } from "../../constants/imagePaths.contants";
import "./admin-sidebar.scss";
import { useState } from "react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarMode: "full" | "compact" | "mobile" | "none";
  onSidebarModeChange: (mode: "full" | "compact" | "none") => void;
  isMobile: boolean;
}

interface MenuItem {
  icon: JSX.Element;
  text: string;
  link: string;
  children?: MenuItem[];
}

const AdminSidebar = ({
  isOpen,
  onClose,
  sidebarMode,
  onSidebarModeChange,
  isMobile,
}: AdminSidebarProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const handleClick = (index: number) => () => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const menuItems: MenuItem[] = [
    {
      icon: <Person />,
      text: "Users",
      link: "/users",
      children: [
        {
          icon: <Group />,
          text: "Roles",
          link: "/roles",
        },
        {
          icon: <Settings />,
          text: "Permissions",
          link: "permissions",
        },
        {
          icon: <Settings />,
          text: "Role Permissions",
          link: "role-permissions",
        },
      ],
    },
    {
      icon: <Timeline />,
      text: "Activities",
      link: "/activities",
      children: [
        {
          icon: <Category />,
          text: "Activity Categories",
          link: "/activities/categories",
        },
        {
          icon: <Event />,
          text: "Activity Sessions",
          link: "/activities/sessions",
        },
        {
          icon: <Event />,
          text: "Activity Participations",
          link: "/activities/participations",
        },
        {
          icon: <Event />,
          text: "Attendance Complaints",
          link: "/activities/attendance-complaints",
        },
      ],
    },
    {
      icon: <School />,
      text: "School",
      link: "/school",
      children: [
        {
          icon: <Event />,
          text: "Academic Years",
          link: "/academic-years",
        },
        {
          icon: <Event />,
          text: "Faculty",
          link: "/faculty",
        },
        {
          icon: <Event />,
          text: "Class",
          link: "/class",
        },
      ],
    },
    {
      icon: <Notifications />,
      text: "Notifications",
      link: "/notifications",
      children: [
        {
          icon: <Event />,
          text: "Notification Types",
          link: "/notifications/types",
        },
      ],
    },
    {
      icon: <History />,
      text: "Record Histories",
      link: "/record-histories",
      children: [
        {
          icon: <Settings />,
          text: "Action Types",
          link: "action-types",
        },
      ],
    },
  ];

  const isCompactMode = sidebarMode === "compact";
  const isFullMode = sidebarMode === "full";

  const handleToggleChangeCompactFull = () => {
    if (isCompactMode) {
      onSidebarModeChange("full");
    } else if (isFullMode) {
      onSidebarModeChange("compact");
    }
  };

  const handleToggleSubMenu = (index: number) => {
    setOpenMenu(openMenu === `${index}` ? null : `${index}`);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      className="drawer"
    >
      <Box className={`sidebar ${isCompactMode ? "compact" : ""}`}>
        {!isMobile && (
          <>
            <div className="actions expand-actions">
              <IconButton
                onClick={handleToggleChangeCompactFull}
                className="expand-button"
              >
                {isCompactMode ? (
                  <ChevronRight className="icon" />
                ) : (
                  <ChevronLeft className="icon" />
                )}
              </IconButton>
            </div>
            <Divider className="divider" />
          </>
        )}
        <Link to={"/"} className="brand">
          <img src={imagePaths.LOGO_DNTU} alt="DNTU Logo" className="logo" />
          <Typography className="title">
            {isCompactMode ? "" : "Trường Đại Học Công Nghệ Đồng Nai"}
          </Typography>
        </Link>
        <Divider className="divider" />

        <List className="menu">
          {menuItems.map((item, index) => (
            <>
              <ListItemButton
                key={item.text}
                onClick={handleClick(index)}
                sx={{ color: "white" }}
                component={Link}
                to={item.link}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} className="itemText" />
                {item.children && (
                  <IconButton
                    onClick={() => handleToggleSubMenu(index)}
                    sx={{ color: "white" }}
                    className="itemIcon itemIcon--expand"
                  >
                    {openIndex === index ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </ListItemButton>
              <Collapse
                in={openIndex === index}
                timeout="auto"
                unmountOnExit
                className="sub-menu"
              >
                <>
                  <List component="div" disablePadding>
                    {item.children?.map((subItem, i) => (
                      <ListItemButton
                        key={i}
                        sx={{ color: "white", pl: 4 }}
                        component={Link}
                        to={subItem.link}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </>
              </Collapse>
            </>
          ))}
        </List>
        <Divider className="divider" />

        <div className="actions">
          {isCompactMode ? (
            <IconButton>
              <Login className="icon" />
            </IconButton>
          ) : (
            <Button className="button">Đăng nhập</Button>
          )}
        </div>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
