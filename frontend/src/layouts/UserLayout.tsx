import Routes from "../routes/UserRoutes";
import Navbar from "../components/navbar/UserNavbar.component";
import Header from "../components/header/Header.component";
import UserSliders from "../components/UI/user-dashboard/user-sliders/UserSliders.component";

const UserLayout = () => {
  const menuItems = [
    {
      label: "Trang chủ",
      link: "/",
    },
    {
      label: "Đoàn Trường",
      link: "doan-truong",
    },
    {
      label: "Đăng ký CTXH",
      link: "activities",
    },
    {
      label: "Quản lý CTXH cá nhân",
      subMenuItems: [
        {
          label: "CTXH đã tham gia",
          link: "/item1",
        },
        {
          label: "Khiếu nại",
          link: "/item2",
        },
      ],
    },
  ];

  return (
    <>
      <Header />
      <Navbar menuItems={menuItems} />
      <UserSliders />
      <div className="wrapper">
        <Routes />
      </div>
    </>
  );
};

export default UserLayout;
