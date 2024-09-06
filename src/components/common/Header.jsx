import { styled, Typography } from "@mui/material";
import React from "react";

const Header = ({ title }) => (
  <Wrapper>
    <Title>{title}</Title>
  </Wrapper>
);

const Wrapper = styled("div")(() => ({
  marginBottom: "40px",
}));
const Title = styled(Typography)(() => ({
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "-0.025em",
  textDecorationColor: "#0f172a",
}));

export default Header;
