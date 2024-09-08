import React, { useCallback } from "react";
import { Formik } from "formik";
import { useMediaQuery, useTheme } from "@mui/material";
import WeekdayList from "../availability-modal/weekday-list/WeekdayList";
import { availabilitySchema } from "../availabilitySchema";
import { useUserAvailability } from "../api/useUserAvailability";
import { useUserAvailabilityUpdate } from "../api/useUserAvailabilityUpdate";
import { AVAILABILITY_INITIAL_VALUES } from "../../../helpers/constants";
import {
  DialogButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../../pages/login-and-registration/StyledComponents";
import { useTranslation } from "react-i18next";

const AvailabilityModal = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoading, data, error } = useUserAvailability();
  const { mutateAsync: updateAvailability, error: updateError } =
    useUserAvailabilityUpdate();

  const handleSubmitting = useCallback(
    async (values) => {
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
    <StyledDialog
      id="availability-modal"
      fullScreen={isMobile}
      open={isOpen}
      onClose={(prev) => setIsOpen(!prev)}
    >
      <StyledDialogTitle>
        {t("availability.editAvailability")}
      </StyledDialogTitle>
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
                  {t("form.cancel")}
                </DialogButton>
                <DialogButton
                  type="submit"
                  onClick={(prev) => setIsOpen(!prev)}
                >
                  {t("form.submit")}
                </DialogButton>
              </StyledDialogActions>
            </form>
          )}
        </Formik>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default AvailabilityModal;
