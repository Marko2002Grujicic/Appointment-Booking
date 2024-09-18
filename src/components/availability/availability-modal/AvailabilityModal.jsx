import React, { useCallback } from "react";
import { Formik } from "formik";
import { useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUserAvailability } from "../api/useUserAvailability";
import { useUserAvailabilityUpdate } from "../api/useUserAvailabilityUpdate";
import WeekdayList from "../availability-modal/weekday-list/WeekdayList";
import { availabilitySchema } from "../availabilitySchema";
import { AVAILABILITY_INITIAL_VALUES } from "../../../helpers/constants";
import {
  DialogButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from "../../common/StyledComponents";
import { toast } from "react-toastify";

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
        toast.error(t("toast.error"));
      } finally {
        toast.success(t("toast.availabilityUpdated"));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {({ setFieldValue, handleSubmit, errors, dirty }) => (
            <form onSubmit={handleSubmit}>
              <WeekdayList setFieldValue={setFieldValue} errors={errors} />
              <StyledDialogActions>
                <DialogButton onClick={(prev) => setIsOpen(!prev)}>
                  {t("form.cancel")}
                </DialogButton>
                <DialogButton
                  type="submit"
                  onClick={(prev) => setIsOpen(!prev)}
                  disabled={!dirty || isLoading || error || updateError}
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
