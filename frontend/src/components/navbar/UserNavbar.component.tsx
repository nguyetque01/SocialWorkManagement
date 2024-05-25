import React, { useState } from "react";
import "./user-navbar.scss";

interface MenuItem {
  label: string;
  link?: string;
  subMenuItems?: MenuItem[];
}

interface UserNavbarProps {
  menuItems: MenuItem[];
}

const UserNavbar: React.FC<UserNavbarProps> = ({ menuItems }) => {
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
            <a href={item.link}>{item.label}</a>
            {item.subMenuItems && activeSubMenu === item.label && (
              <ul className="sub-menu-items">
                {item.subMenuItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="sub-menu-item">
                    <a href={subItem.link}>{subItem.label}</a>
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
