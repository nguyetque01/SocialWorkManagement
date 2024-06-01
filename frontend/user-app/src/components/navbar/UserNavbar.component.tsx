import { useState } from "react";
import { Link } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import "./user-navbar.scss";

interface MenuItem {
  label: string;
  link?: string;
  subMenuItems?: MenuItem[];
}

interface UserNavbarProps {
  menuItems: MenuItem[];
}

const UserNavbar = ({ menuItems }: UserNavbarProps) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setActiveSubMenu(label);
  };

  const handleMouseLeave = () => {
    setActiveSubMenu(null);
  };

  return (
    <nav className="user-navbar" onMouseLeave={handleMouseLeave}>
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="menu-item"
            onMouseEnter={() => handleMouseEnter(item.label)}
          >
            {item.link ? (
              <ListItemButton component={Link} to={item.link}>
                {item.label}
              </ListItemButton>
            ) : (
              <ListItemButton>{item.label}</ListItemButton>
            )}
            {item.subMenuItems && activeSubMenu === item.label && (
              <ul className="sub-menu-items">
                {item.subMenuItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sub-menu-item">
                    {subItem.link ? (
                      <ListItemButton component={Link} to={subItem.link}>
                        {subItem.label}
                      </ListItemButton>
                    ) : (
                      <ListItemButton>{subItem.label}</ListItemButton>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNavbar;
