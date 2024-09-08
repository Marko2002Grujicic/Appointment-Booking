import React from "react";
import { styled } from "@mui/system";
import { colors } from "../../../../../helpers/colors";
import HelperText from "../../../../common/HelperText";

const DatePicker = (props) => {
  return (
    <StyledWrapper>
      <StyledDateInput type="date" id="date-picker" {...props} />
      <HelperText helperText={props.helperText} />
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

const StyledDateInput = styled("input")(({ theme, helperText }) => ({
  flex: 1,
  padding: "15.5px",
  fontFamily: "Figtree",
  lineHeight: "1.4em",
  borderRadius: "5px",
  border:
    (helperText && `1px solid ${colors.error}`) ||
    `1px solid ${
      theme.palette.mode === "dark" ? colors.dark.border : colors.light.border
    }`,
  background:
    theme.palette.mode === "dark" ? colors.dark.primary : colors.light.primary,
  color:
    theme.palette.mode !== "dark" ? colors.dark.primary : colors.light.primary,
  "& input": {
    height: 56.92,
  },
  "&:hover": {
    border: helperText
      ? `1px solid ${colors.error}`
      : `1px solid ${theme.palette.mode === "dark" ? "#fff" : "#000"}`,
  },
  "&:focus": {
    border: helperText
      ? `1px solid ${colors.error}`
      : `1px solid ${theme.palette.mode === "dark" ? "#fff" : "#d0d4dd"}`,
    outline: "none",
  },
}));

export default DatePicker;
