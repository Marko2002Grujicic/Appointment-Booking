import React, { useState, useEffect } from "react";
import {
  SettingsOutlined,
  ImportContacts,
  CalendarTodayOutlined,
  Add,
} from "@mui/icons-material";
import NavItem from "./NavItem";

const navItems = [
  {
    title: "Нови Састанак",
    icon: <Add />,
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
  {
    title: "Помоћ",
    to: "/help",
    icon: <ImportContacts />,
  },
];

const NavItems = () => {
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedPage");
    return saved ? JSON.parse(saved) : "Календар";
  });

  useEffect(() => {
    localStorage.setItem("selectedPage", JSON.stringify(selected));
  }, [selected]);

  return navItems.map((item, index) => (
    <NavItem
      key={index}
      title={item.title}
      to={item.to}
      icon={item.icon}
      selected={item.event ? undefined : selected}
      setSelected={setSelected}
      event={item.event}
    />
  ));
};

export default NavItems;
