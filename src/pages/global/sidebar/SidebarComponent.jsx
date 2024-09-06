import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, styled, useTheme } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { tokens } from "../../../theme.js";
import NavItems from "./components/NavItems.jsx";

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const icon = isCollapsed ? (
    <IconButton>
      <MenuOutlined />
    </IconButton>
  ) : undefined;

  return (
    <StyledWrapper isCollapsed={isCollapsed} colors={colors}>
      <Sidebar className="custom-styles" collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={icon}
            id="collapse-button"
          >
            {!isCollapsed && (
              <SidebarHeader>
                <StyledLogo src="/studis-logo.png" alt="ATVSS Nis" />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </SidebarHeader>
            )}
          </MenuItem>
          <NavItemsWrapper>
            <NavItems
              isCollapsed={isCollapsed}
              collapse={() => setIsCollapsed(!isCollapsed)}
            />
          </NavItemsWrapper>
        </Menu>
      </Sidebar>
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")(({ isCollapsed, colors }) => ({
  width: "fit-content",
  height: "100%",
  "& .css-dip3t8": {
    backgroundColor: colors.background.default,
  },
  "& .css-fftdg0": {
    borderColor: colors.background.reversed,
  },
  "& #collapse-button": {
    margin: "10px 0 20px 0",
  },
  "& #collapse-button:hover": {
    backgroundColor: `${colors.background.default} !important`,
    transform: "none",
  },
  ".ps-active > a": {
    backgroundColor: `${colors.background.reversed} !important`,
    color: `${colors.grey[900]} !important`,
    transform: "scale(1.1) !important",
  },
  ".ps-active > a >span": {
    transform: "scale(1)",
  },
  "@media (max-width: 600px)": {
    width: !isCollapsed ? "100%" : "80px",
    position: !isCollapsed && "absolute",
  },
}));

const SidebarHeader = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledLogo = styled("img")(() => ({
  maxWidth: "50px",
  paddingTop: "10px",
}));

const NavItemsWrapper = styled("div")(({ isCollapsed }) => ({
  paddingLeft: isCollapsed ? undefined : "5%",
}));

export default SidebarComponent;
