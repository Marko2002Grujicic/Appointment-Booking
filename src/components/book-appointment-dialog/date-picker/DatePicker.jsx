import React, { memo } from "react";
import { styled } from "@mui/system";

const StyledDateInput = styled("input")(({ theme }) => ({
  flex: 1,
  padding: "15.5px",
  fontFamily: "Figtree",
  borderRadius: "5px",
  border: `1px solid ${theme.palette.mode === "dark" ? "#52525E" : "#c4c4c4"}`,
  background: theme.palette.mode === "dark" ? "#1E1E2D" : "#F2F4F7",
  color: theme.palette.mode === "light" ? "#1E1E2D" : "#F2F4F7",
  "&:hover": {
    border: `1px solid ${theme.palette.mode === "dark" ? "#fff" : "black"}`,
  },
  "&:focus": {
    border: `2px solid ${theme.palette.mode === "dark" ? "#fff" : "#d0d4dd"}`,
    outline: "none",
  },
}));

const DatePicker = memo((props) => {
  return <StyledDateInput type="date" id="date-picker" {...props} />;
});

export default DatePicker;
