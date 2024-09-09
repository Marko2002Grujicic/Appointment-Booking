import React from "react";
import {
  SettingsOutlined,
  CalendarTodayOutlined,
  Add,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

const navItems = [
  {
    title: "Нови Састанак",
    icon: <Add />,
    to: "/",
    event: true,
  },
  {
    title: "Календар",
    to: "/",
    icon: <CalendarTodayOutlined />,
  },
  {
    title: "Подешавања",
    to: "/settings",
    icon: <SettingsOutlined />,
  },
];

const NavItems = ({ collapse, isCollapsed }) => {
  const location = useLocation();

  return navItems.map((item, index) => {
    const isSelected = location.pathname === item.to;

    return (
      <NavItem
        isCollapsed={isCollapsed}
        collapse={collapse}
        key={index}
        title={item.title}
        to={item.to}
        icon={item.icon}
        selected={isSelected}
        event={item.event}
      />
    );
  });
};

export default NavItems;
