import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { DialogContext } from "../../context/DialogContext";
import AppointmentForm from "./appointment-form/AppointmentForm";

const BookAppointmentDialog = () => {
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

export default BookAppointmentDialog;

const StyledDialogContent = styled(DialogContent)(({ theme, ismobile }) => ({
  width: ismobile ? "100%" : "500px",
  background: theme.palette.mode !== "light" ? "#1E1E2D" : "#F2F4F7",
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({ theme }) => ({
  background: theme.palette.mode !== "light" ? "#1E1E2D" : "#F2F4F7",
}));
