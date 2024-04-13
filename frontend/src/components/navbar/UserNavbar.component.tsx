import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LightMode, DarkMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../context/theme.context";
import "./user-navbar.scss";

interface UserNavbarProps {
  toggleSidebar: () => void;
}

const links = [{ href: "/account", label: "Account" }];

const UserNavbar = ({ toggleSidebar }: UserNavbarProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const toggleOpenMenu = () => {
    setOpen((prevState) => !prevState);
  };

  const menuStyles = open ? "menu open" : "menu";

  return (
    <div className="navbar">
      <div className="navbar__left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className="brand">
          <span>Social Work Management</span>
        </div>
      </div>
      <div className="navbar__right">
        <div className={menuStyles}>
          <ul>
            {links.map((item) => (
              <li key={item.href} onClick={toggleOpenMenu}>
                <Link to={item.href} onClick={toggleOpenMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hamburger">
          <Menu onClick={toggleOpenMenu} />
        </div>
        <div className="toggle">
          <ToggleButton
            value={"check"}
            selected={darkMode}
            onChange={toggleDarkMode}
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </ToggleButton>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
