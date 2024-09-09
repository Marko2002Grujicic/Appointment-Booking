import React from "react";
import { styled } from "@mui/material";
import { colors } from "./../../helpers/colors";

const PageWrapper = ({ children }) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
};

const StyledPageWrapper = styled("div")(({ theme }) => ({
  margin: "20px",

  ".css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 30px ${
      theme.palette.mode !== "light"
        ? colors.dark.primary
        : colors.light.primary
    } inset !important`,
  },

  "@media (max-width: 375px)": {
    margin: 0,
    marginLeft: "10px",
  },
}));
export default PageWrapper;
