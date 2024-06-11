import React from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { imagePaths } from "../../constants/imagePaths.contants";
import Account from "../account/Account.component";
import { Notifications } from "@mui/icons-material";
import "./header.scss";
import SearchBar from "../search/SearchBar.component";
 
const Header: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };
  return (
    <AppBar position="static" className="app-bar">
      <Toolbar className="header">
        <Box className="header__left">
          <Link to={"/"} className="brand">
            <Box className="logo">
              <img
                src={imagePaths.LOGO_DNTU}
                alt="DNTU Logo"
                className="logo-img"
              />
            </Box>
            <Box className="brand-name">
              <Typography>Trường Đại Học Công Nghệ Đồng Nai</Typography>
              <Typography>Hệ Thống Quản Lý Công Tác Xã Hội</Typography>
            </Box>
          </Link>
        </Box>
        <Box className="header__middle"></Box>
        <Box className="header__right">
          <SearchBar onSearch={handleSearch} />
          <div className="header__right-icons">
            <IconButton>
              <Badge badgeContent={4} color="error">
                <Notifications color="inherit" />
              </Badge>
            </IconButton>
          </div>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
