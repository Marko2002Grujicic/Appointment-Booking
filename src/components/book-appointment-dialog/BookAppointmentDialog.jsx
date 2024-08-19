import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { DialogContext } from "../../context/DialogContext";
import AppointmentForm from "./appointment-form/AppointmentForm";

const BookAppointmentDialog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isOpen, setIsOpen } = useContext(DialogContext);
  const toggleModal = (prev) => setIsOpen(!prev);
  const defaultColor = colors.background.default;
  const reversedColor = colors.background.reversed;
  return (
    <>
      <Dialog open={isOpen} onClose={toggleModal} id="appointment-dialog">
        <DialogTitle
          sx={{
            background: defaultColor,
          }}
        >
          Креирајте Састанак
        </DialogTitle>
        <DialogContent sx={{ width: 500, background: defaultColor }}>
          <AppointmentForm />
        </DialogContent>
        <DialogActions sx={{ background: defaultColor }}>
          <Button
            sx={{
              color: reversedColor,
            }}
            onClick={toggleModal}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: reversedColor,
            }}
            type="submit"
          >
            Set Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookAppointmentDialog;
