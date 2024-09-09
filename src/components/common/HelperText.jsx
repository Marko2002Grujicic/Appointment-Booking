import React from "react";
import { styled } from "@mui/system";
import { colors } from "../../helpers/colors";
import { useTranslation } from "react-i18next";

const HelperText = ({ helperText, overlap }) => {
  const { t } = useTranslation();
  return (
    helperText && <Text overlap={overlap}>{t(`errors.${helperText}`)}</Text>
  );
};

export default HelperText;

const Text = styled("p")(({ overlap }) => ({
  color: colors.error,
  position: overlap ? "absolute" : "static",
  fontWeight: 400,
  fontSize: "0.6428571428571428rem",
  lineHeight: 1.66,
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: 0,
  marginLeft: "14px",
}));
