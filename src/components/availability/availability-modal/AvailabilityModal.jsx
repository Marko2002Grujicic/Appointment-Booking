import React, { useCallback } from "react";
import { Formik } from "formik";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import WeekdayList from "../availability-modal/weekday-list/WeekdayList";
import { availabilitySchema } from "../availabilitySchema";
import { useUserAvailability } from "../helper/useUserAvailability";
import { useUserAvailabilityUpdate } from "../helper/useUserAvailabilityUpdate";
import { AVAILABILITY_INITIAL_VALUES } from "../../../helpers/constants";
import {
  DialogButton,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../../pages/login-and-registration/StyledComponents";

const AvailabilityModal = ({ isOpen, setIsOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoading, data, error } = useUserAvailability();
  const { mutateAsync: updateAvailability, error: updateError } =
    useUserAvailabilityUpdate();

  const handleSubmitting = useCallback(
    async (values) => {
      console.log("Submit handler triggered with values:", values);
      try {
        await updateAvailability(values);
      } catch (error) {
        console.error("Failed to save availability:", error);
      }
    },
    [updateAvailability]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || updateError) return <div>There was an Error</div>;

  return (
    <Dialog
      id="availability-modal"
      fullScreen={isMobile}
      open={isOpen}
      onClose={(prev) => setIsOpen(!prev)}
    >
      <StyledDialogTitle>Измените Доступност</StyledDialogTitle>
      <StyledDialogContent ismobile={isMobile ? "true" : undefined}>
        <Formik
          initialValues={data || AVAILABILITY_INITIAL_VALUES}
          validationSchema={availabilitySchema}
          onSubmit={handleSubmitting}
        >
          {({ setFieldValue, handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <WeekdayList setFieldValue={setFieldValue} errors={errors} />
              <StyledDialogActions>
                <DialogButton onClick={(prev) => setIsOpen(!prev)}>
                  Откажи
                </DialogButton>
                <DialogButton type="submit">Сачувај</DialogButton>
              </StyledDialogActions>
            </form>
          )}
        </Formik>
      </StyledDialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
