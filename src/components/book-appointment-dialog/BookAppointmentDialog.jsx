import React, { useContext } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
          <AppointmentForm
            reversedColor={reversedColor}
            defaultColor={defaultColor}
            toggleModal={toggleModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookAppointmentDialog;
