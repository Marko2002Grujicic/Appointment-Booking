import React, { useContext } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { DialogContext } from "../../context/DialogContext";
import AppointmentForm from "./appointment-form/AppointmentForm";
import {
  StyledDialog,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../pages/login-and-registration/StyledComponents";
import { useTranslation } from "react-i18next";

const AppointmentDialog = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, selectedEvent } = useContext(DialogContext);
  const toggleModal = (prev) => setIsOpen(!prev);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDialog
      fullScreen={isMobile}
      open={isOpen}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        toggleModal();
      }}
      id="appointment-dialog"
    >
      <StyledDialogTitle>
        {selectedEvent
          ? t("appointments.editAppointment")
          : t("appointments.createAppointment")}
      </StyledDialogTitle>
      <StyledDialogContent>
        <AppointmentForm eventData={selectedEvent} />
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default AppointmentDialog;
