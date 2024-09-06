import React from "react";
import { styled } from "@mui/system";

const DatePicker = (props) => {
  return (
    <StyledWrapper>
      <StyledDateInput type="date" id="date-picker" {...props} />
      <HelperText {...props}>{props.helperText}</HelperText>
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")(() => ({
  display: "inline-flex",
  width: "100%",
  flexDirection: "column",
  position: "relative",
  justifyContent: "flex-start",
  padding: 0,
  margin: 0,
  border: 0,
}));

export const HelperText = styled("p")(({ helperText }) => ({
  display: !helperText ? "none" : "block",
  color: "#f44336",
  fontWeight: 400,
  fontSize: "0.6428571428571428rem",
  lineHeight: 1.66,
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: 0,
  marginLeft: "14px",
}));

const StyledDateInput = styled("input")(({ theme, helperText }) => ({
  flex: 1,
  padding: "15.5px",
  fontFamily: "Figtree",
  lineHeight: "1.4em",
  borderRadius: "5px",
  border: helperText
    ? "1px solid #F44336"
    : `1px solid ${theme.palette.mode === "dark" ? "#52525E" : "#c4c4c4"}`,
  background: theme.palette.mode === "dark" ? "#1E1E2D" : "#F2F4F7",
  color: theme.palette.mode !== "dark" ? "#1E1E2D" : "#F2F4F7",
  "& input": {
    height: 56.92,
  },
  "&:hover": {
    border: helperText
      ? "1px solid #F44336"
      : `1px solid ${theme.palette.mode === "dark" ? "#fff" : "black"}`,
  },
  "&:focus": {
    border: helperText
      ? "1px solid #F44336"
      : `1px solid ${theme.palette.mode === "dark" ? "#fff" : "#d0d4dd"}`,
    outline: "none",
  },
}));

export default DatePicker;
