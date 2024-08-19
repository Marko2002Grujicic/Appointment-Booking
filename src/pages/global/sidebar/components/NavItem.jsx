import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../../../theme";
import { DialogContext } from "../../../../context/DialogContext";
const NavItem = ({ title, to, icon, selected, setSelected, event = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setIsOpen } = useContext(DialogContext);

  const menuItemStyles = {
    backgroundColor: colors.background.default,
    transition: "transform 0.1s ease",
    marginBottom: "5px",
    color: colors.grey[100],
  };
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.backgroundColor = colors.background.reversed;
    e.currentTarget.style.color = colors.grey[900];
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.backgroundColor = colors.background.default;
    e.currentTarget.style.color = colors.grey[100];
  };

  return (
    <MenuItem
      active={selected === title}
      className="menu-item"
      style={menuItemStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={event ? () => setIsOpen(true) : () => setSelected(title)}
      component={<Link to={to} />}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default NavItem;
