export const menuItems = [
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
        label: "CTXH đã đăng ký",
        link: "/registerd-activities",
      },
      {
        label: "CTXH đã tham gia",
        link: "/participated-activities",
      },
      {
        label: "Khiếu nại",
        link: "/item2",
      },
    ],
  },
];
