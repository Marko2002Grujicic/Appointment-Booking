import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../../../theme";
import { DialogContext } from "../../../../context/DialogContext";

const NavItem = ({
  title,
  to,
  icon,
  selected,
  event = false,
  collapse,
  isCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setIsOpen, setSelectedEvent } = useContext(DialogContext);

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

  const onClick = () => {
    if (event) {
      setIsOpen(true);
      setSelectedEvent(null);
    }
    if (!isCollapsed) {
      collapse();
    }
  };

  return (
    <MenuItem
      active={!event && selected}
      style={menuItemStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      component={<Link to={to} />}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

export default NavItem;
