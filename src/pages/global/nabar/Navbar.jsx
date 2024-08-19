import React from "react";
import { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
} from "@mui/icons-material";

import { ColorModeContext, tokens } from "../../../theme";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      borderBottom={`1px solid ${colors.grey[500]}`}
      p={2}
    >
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
