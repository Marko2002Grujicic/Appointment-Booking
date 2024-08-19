import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { tokens } from "../../../theme.js";
import NavItems from "./components/NavItems.jsx";

const SidebarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Box
      sx={{
        width: "fit-content",
        "@media (max-width: 425px)": {
          position: !isCollapsed ? "absolute" : "static",
        },
        "& .css-dip3t8": {
          backgroundColor: colors.background.default,
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
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        transitionDuration={400}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <IconButton>
                  <MenuOutlined />
                </IconButton>
              ) : undefined
            }
            id="collapse-button"
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img
                  src="/studis-logo.png"
                  alt="ATVSS Nis"
                  style={{ maxWidth: "50px", paddingTop: "10px" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <NavItems />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarComponent;
