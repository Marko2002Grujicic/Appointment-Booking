import React, { memo } from "react";
import { styled } from "@mui/system";

const StyledTextArea = styled("textarea")(({ theme }) => ({
  width: "100%",
  fontSize: "13.7143px",
  fontWeight: "400",
  lineHeight: "1.5",
  padding: "8px 12px",
  borderRadius: "5px",
  border: `1px solid ${theme.palette.mode === "dark" ? "#52525E" : "#c4c4c4"}`,
  fontFamily: "Figtree",
  background: theme.palette.mode === "dark" ? "#1E1E2D" : "#F2F4F7",
  color: theme.palette.mode === "light" ? "#1E1E2D" : "#F2F4F7",
  "&::placeholder": {
    fontFamily: "Roboto",
    color: theme.palette.mode === "light" ? "#8e8e8e" : "#ccc",
    fontSize: "13.7143px",
    fontWeight: "400",
    lineHeight: "1.5",
    opacity: "0.8 ",
  },
  "&:hover": {
    border: `1.5px solid ${theme.palette.mode === "dark" ? "#fff" : "black"}`,
  },
  "&:focus": {
    border: `1.5px solid ${theme.palette.mode === "dark" ? "#fff" : "#d0d4dd"}`,
    outline: "none",
  },
}));

const TextArea = memo((props) => {
  return (
    <StyledTextArea rows={3} placeholder="Додатне информације..." {...props} />
  );
});

export default TextArea;
