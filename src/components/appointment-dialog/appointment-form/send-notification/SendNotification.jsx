import { FormControlLabel } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyledCheckbox } from "../../../common/StyledComponents";

const SendNotification = ({ setFieldValue, value }) => {
  const { t } = useTranslation();
  return (
    <FormControlLabel
      label={t("appointments.sendNotification")}
      control={
        <StyledCheckbox
          checked={value}
          onChange={() => setFieldValue("sendNotification", !value)}
        />
      }
    />
  );
};

export default SendNotification;
