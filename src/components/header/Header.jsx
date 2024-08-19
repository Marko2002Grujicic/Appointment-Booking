import { Box, Typography } from "@mui/material";
import React from "react";

const Header = ({ category, title }) => (
  <Box sx={{ marginBottom: "40px" }}>
    <Typography sx={{ fontSize: "18px" }}>{category}</Typography>
    <Typography
      sx={{
        fontSize: "32px",
        fontWeight: "bold",
        letterSpacing: "-0.025em",
        textDecorationColor: "#0f172a",
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default Header;
