import React from "react";
import Routes from "../routes/UserRoutes";
import Navbar from "../components/navbar/UserNavbar.component";
import Header from "../components/header/Header.component";
import { menuItems } from "../constants/menu.contants";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Navbar menuItems={menuItems} />
      <Routes />
    </>
  );
};

export default UserLayout;
