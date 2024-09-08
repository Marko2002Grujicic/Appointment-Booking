import React, { useContext } from "react";
import { Dialog, useTheme, useMediaQuery } from "@mui/material";
import { DialogContext } from "../../context/DialogContext";
import AppointmentForm from "./appointment-form/AppointmentForm";
import {
  StyledDialogContent,
  StyledDialogTitle,
} from "../../pages/login-and-registration/StyledComponents";

const AppointmentDialog = () => {
  const { isOpen, setIsOpen, selectedEvent } = useContext(DialogContext);
  const toggleModal = (prev) => setIsOpen(!prev);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={isMobile}
      open={isOpen}
      onClose={toggleModal}
      id="appointment-dialog"
    >
      <StyledDialogTitle>
        {selectedEvent ? "Измени Састанак" : "Креирајте Састанак"}
      </StyledDialogTitle>
      <StyledDialogContent ismobile={isMobile ? "true" : undefined}>
        <AppointmentForm eventData={selectedEvent} />
      </StyledDialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
