import React, { useContext, useState, useEffect, useMemo } from "react";
import moment from "moment";
import { styled } from "@mui/system";
import { Formik } from "formik";
import { Stack } from "@mui/material";
import { DialogContext } from "../../../context/DialogContext";
import { appointmentFormSchema } from "./appointmentFormSchema";
import { formatEventToAPI } from "../../../helpers/formatEventToApi";
import { validateTimeSelection } from "../../../helpers/validateTimeSelection";
import { generateTimeIntervals } from "../../../helpers/timeAdapters";
import DateTimePicker from "./date-time/DateTimePicker";
import Guests from "./guests/Guests";
import {
  DeleteButton,
  DialogButton,
  FormInput,
  StyledDialogActions,
} from "../../common/StyledComponents";
import { useTranslation } from "react-i18next";
import { useUserAvailability } from "../../availability/api/useUserAvailability";
import { useAppointmentsCreate } from "../api/useAppointmentsCreate";
import { useAppointmentsUpdate } from "../api/useAppointementsUpdate";
import { useAppointmentsDelete } from "../api/useAppointmentsDelete";
import { useGuestsEmails } from "../../../helpers/API/guests/useGuestsEmail";
import { useGuestsAvailabilities } from "../../../helpers/API/guests/useGuestsAvailabilities";

const AppointmentForm = ({ eventData }) => {
  const { setIsOpen } = useContext(DialogContext);
  const { isLoading, data: userAvailability } = useUserAvailability();
  const { mutateAsync: createAppointment, isLoading: isCreating } =
    useAppointmentsCreate();
  const { mutateAsync: editAppointment, isLoading: isEditing } =
    useAppointmentsUpdate();
  const { mutate: deleteAppointment, isLoading: isDeleting } =
    useAppointmentsDelete();
  const [selectedDate, setSelectedDate] = useState(
    moment(eventData?.start).format("YYYY-MM-DD")
  );
  const { data: emailOptions } = useGuestsEmails();

  // todo implement guest availability and a case where you have no availabilities 'No availabilities message or something'
  const { data: guestAvailabilities } = useGuestsAvailabilities();

  const [timeIntervals, setTimeIntervals] = useState([]);
  const [rawTimeIntervals, setRawTimeIntervals] = useState([]);
  const initialValues = useMemo(
    () => ({
      title: eventData?.title || "",
      start: eventData ? moment(eventData.start).format("HH:mm") : "",
      end: eventData ? moment(eventData.end).format("HH:mm") : "",
      date: eventData
        ? moment(eventData.start).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      location: eventData?.location || "",
      guests: eventData ? JSON.parse(eventData.guests) : [],
      description: eventData?.description || "",
    }),
    [eventData]
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (userAvailability) {
      const dayIndex = moment(selectedDate).get("day");
      const selectableTimeIntervals = generateTimeIntervals(
        userAvailability,
        dayIndex
      );
      setTimeIntervals(selectableTimeIntervals);
      const rawTime = generateTimeIntervals(userAvailability, dayIndex, true);
      setRawTimeIntervals(rawTime);
    } else {
      setTimeIntervals([]);
      setRawTimeIntervals([]);
    }
  }, [selectedDate, userAvailability]);

  const handleDelete = async () => {
    try {
      const eventId = eventData.id;
      deleteAppointment({ eventId });
    } catch (error) {
      console.error("Error deleting the event", error.message);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  const handleFormSubmit = async (newEvent) => {
    const formattedEvent = formatEventToAPI(newEvent);

    const isValidTime = [userAvailability].every((availability) =>
      validateTimeSelection(
        newEvent.date,
        newEvent.start,
        newEvent.end,
        availability
      )
    );

    if (!isValidTime) {
      alert("Selected time is not available for all participants.");
      return;
    }

    try {
      if (eventData && formattedEvent) {
        const eventId = eventData.id;
        await editAppointment({ eventId, formattedEvent });
      } else {
        await createAppointment({ formattedEvent });
      }
    } catch (error) {
      console.error("Error submitting the event:", error.message);
    } finally {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={false}
      onSubmit={handleFormSubmit}
      validationSchema={appointmentFormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <FormContainer onSubmit={handleSubmit}>
          <StyledStack>
            <FormInput
              fullWidth
              variant="outlined"
              color="secondary"
              type="text"
              label={t("appointments.title")}
              placeholder={t("appointments.addTitle")}
              name="title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched["title"]) && Boolean(errors["title"])}
              helperText={
                touched["title"] && errors["title"]
                  ? t(`errors.${errors["title"]}`)
                  : ""
              }
            />
            <DateTimePicker
              values={values}
              errors={errors}
              touched={touched}
              timeIntervals={timeIntervals}
              handleBlur={handleBlur}
              handleChange={handleChange}
              rawTimeIntervals={rawTimeIntervals}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setFieldValue={setFieldValue}
            />
            <FormInput
              fullWidth
              variant="outlined"
              color="secondary"
              type="text"
              label={t("appointments.location")}
              placeholder={t("appointments.addLocation")}
              name="location"
              value={values.location}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched["location"]) && Boolean(errors["location"])
              }
              helperText={
                touched["location"] && errors["location"]
                  ? t(`errors.${errors["location"]}`)
                  : ""
              }
            />
            <Guests
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              emailOptions={emailOptions || []}
            />
            <FormInput
              label={t("appointments.description")}
              fullWidth
              variant="outlined"
              color="secondary"
              type="text"
              name="description"
              value={values.description}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </StyledStack>
          <StyledDialogActions spacebetween={"true"}>
            <DeleteButton
              disabled={isLoading || isCreating || isEditing || isDeleting}
              onClick={handleDelete}
            >
              {t("form.delete")}
            </DeleteButton>
            <FlexBox>
              <DialogButton
                disabled={isLoading || isCreating || isEditing || isDeleting}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {t("form.cancel")}
              </DialogButton>
              <DialogButton
                disabled={isLoading || isCreating || isEditing || isDeleting}
                type="submit"
              >
                {t("form.submit")}
              </DialogButton>
            </FlexBox>
          </StyledDialogActions>
        </FormContainer>
      )}
    </Formik>
  );
};

const FormContainer = styled("form")(() => ({
  width: "100%",
}));

const StyledStack = styled(Stack)(() => ({
  width: "100%",
  gap: "20px",
  marginTop: "10px",
}));

const FlexBox = styled("div")(() => ({
  display: "flex",
}));

export default AppointmentForm;
