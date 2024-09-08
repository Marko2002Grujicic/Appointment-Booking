import { styled, Typography } from "@mui/material";
import React from "react";

const Header = ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
  </Wrapper>
);

const Wrapper = styled("div")(() => ({
  marginBottom: "40px",
  "@media all and (max-width: 1000px)": {
    marginBottom: "30px",
  },
  "@media all and (max-width: 375px)": {
    marginBottom: "20px",
  },
}));
const Title = styled(Typography)(() => ({
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "-0.025em",

  "@media all and (max-width: 1000px)": {
    fontSize: "26px",
  },
  "@media all and (max-width: 375px)": {
    fontSize: "16px",
  },
}));

export default Header;
