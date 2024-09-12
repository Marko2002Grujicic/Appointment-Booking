import React from "react";
import { useContext } from "react";
import { Box, IconButton, styled, Tooltip, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Logout,
} from "@mui/icons-material";

import { useAuth } from "../../../context/AuthProvider";
import { ColorModeContext, tokens } from "../../../theme";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const icon =
    theme.palette.mode === "dark" ? (
      <DarkModeOutlined />
    ) : (
      <LightModeOutlined />
    );

  return (
    <Wrapper colors={colors}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>{icon}</IconButton>
        {isAuthenticated && (
          <Tooltip title="Одјава">
            <IconButton onClick={logout}>
              <Logout />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ colors }) => ({
  display: "flex",
  justifyContent: "flex-end",
  borderBottom: `1px solid ${colors.grey[500]}`,
  padding: "16px",
}));

export default Navbar;
