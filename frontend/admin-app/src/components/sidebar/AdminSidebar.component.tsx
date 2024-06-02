import { Link, useNavigate } from "react-router-dom";
import {
  Box,
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
  Person,
  Timeline,
  Notifications,
  Settings,
  Category,
  Event,
  Group,
  School,
  History,
  Logout,
} from "@mui/icons-material";
import { imagePaths } from "../../constants/imagePaths.contants";
import "./admin-sidebar.scss";
import { useState } from "react";
import LogoutDialog from "../common/dialog/LogoutDialog.component";

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
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <Person />,
      text: "Người dùng",
      link: "/users",
      children: [
        {
          icon: <Group />,
          text: "Vai trò",
          link: "/roles",
        },
        {
          icon: <Settings />,
          text: "Quyền hạn",
          link: "permissions",
        },
        {
          icon: <Settings />,
          text: "Phân quyền",
          link: "role-permissions",
        },
      ],
    },
    {
      icon: <Timeline />,
      text: "Hoạt động",
      link: "/activities",
      children: [
        {
          icon: <Category />,
          text: "Danh mục hoạt động",
          link: "/activity-categories",
        },
        {
          icon: <Event />,
          text: "Buổi hoạt động",
          link: "/activity-sessions",
        },
        {
          icon: <Event />,
          text: "Hoạt động tham gia",
          link: "/activity-participations",
        },
        {
          icon: <Event />,
          text: "Khiếu nại",
          link: "/activity-attendance-complaints",
        },
      ],
    },
    {
      icon: <School />,
      text: "Trường",
      link: "/school",
      children: [
        {
          icon: <Event />,
          text: "Năm học",
          link: "/academic-years",
        },
        {
          icon: <Event />,
          text: "Khoa",
          link: "/faculties",
        },
        {
          icon: <Event />,
          text: "Lớp",
          link: "/classes",
        },
      ],
    },
    {
      icon: <Notifications />,
      text: "Thông báo",
      link: "/notifications",
      children: [
        {
          icon: <Event />,
          text: "Loại thông báo",
          link: "/notification-types",
        },
      ],
    },
    {
      icon: <History />,
      text: "Lịch sử bản ghi",
      link: "/record-histories",
      children: [
        {
          icon: <Settings />,
          text: "Loại hành động",
          link: "action-types",
        },
      ],
    },
    {
      icon: <Logout />,
      text: "Đăng xuất",
      link: "#",
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

  const handleClick = (index: number) => () => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }

    if (index === 5) {
      setConfirmLogoutOpen(true);
    }
  };

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
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
              <div key={index}>
                <ListItemButton
                  key={item.text}
                  onClick={handleClick(index)}
                  sx={{ color: "white" }}
                  component={Link}
                  to={item.link}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {item.icon}
                  </ListItemIcon>
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
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
      <LogoutDialog
        isOpen={confirmLogoutOpen}
        handleClose={() => setConfirmLogoutOpen(false)}
        handleConfirm={handleLogout}
      />
    </>
  );
};

export default AdminSidebar;
