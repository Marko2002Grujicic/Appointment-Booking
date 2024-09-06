import { styled } from "@mui/material";
import React from "react";

const PageWrapper = ({ children }) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
};

const StyledPageWrapper = styled("div")(() => ({
  margin: "20px",
  "@media (max-width: 375px)": {
    margin: 0,
    marginLeft: "10px",
  },
}));
export default PageWrapper;
