import React, { useContext, useState, useEffect, useMemo } from "react";
import moment from "moment";
import { styled } from "@mui/system";
import { Formik } from "formik";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppointmentsCreate } from "../api/useAppointmentsCreate";
import { useAppointmentsUpdate } from "../api/useAppointementsUpdate";
import { useAppointmentsDelete } from "../api/useAppointmentsDelete";
import { useGuestsEmails } from "../../../helpers/API/guests/useGuestsEmail";
import { useGuestsAvailabilities } from "../../../helpers/API/guests/useGuestsAvailabilities";
import { useUserData } from "../../../helpers/API/user/useUserData";

import { DialogContext } from "../../../context/DialogContext";
import { appointmentFormSchema } from "./appointmentFormSchema";
import { formatEventToAPI } from "../../../helpers/formatEventToApi";
import { generateTimeIntervals } from "../../../helpers/timeAdapters";

import SendNotification from "./send-notification/SendNotification";
import DateTimePicker from "./date-time/DateTimePicker";
import Guests from "./guests/Guests";
import {
  DeleteButton,
  DialogButton,
  FormInput,
  StyledDialogActions,
} from "../../common/StyledComponents";

const AppointmentForm = ({ eventData }) => {
  const { t } = useTranslation();
  const { setIsOpen } = useContext(DialogContext);
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
  const { data: userData, isLoading: isUserDataLoading } = useUserData();
  const [selectedGuests, setSelectedGuests] = useState([userData.email]);
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
      guests: eventData
        ? JSON.parse(eventData.guests)
        : userData
        ? [userData.email]
        : [],
      description: eventData?.description || "",
      sendNotification: eventData?.sendNotification || true,
    }),
    [eventData, userData]
  );
  const { data: guestAvailabilities, isLoading: isGuestsAvailabilityLoading } =
    useGuestsAvailabilities(selectedGuests);

  useEffect(() => {
    if (guestAvailabilities) {
      const dayIndex = moment(selectedDate).get("day");
      const selectableTimeIntervals = generateTimeIntervals(
        guestAvailabilities,
        dayIndex
      );
      setTimeIntervals(selectableTimeIntervals);
      const rawTime = generateTimeIntervals(
        guestAvailabilities,
        dayIndex,
        true
      );
      setRawTimeIntervals(rawTime);
    } else {
      setTimeIntervals([]);
      setRawTimeIntervals([]);
    }
  }, [selectedDate, guestAvailabilities]);

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
        dirty,
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
            <Guests
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              isGuestsLoading={isGuestsAvailabilityLoading || isUserDataLoading}
              emailOptions={emailOptions || []}
              setSelectedGuests={setSelectedGuests}
              userEmail={userData.email}
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
            <SendNotification
              value={values.sendNotification}
              setFieldValue={setFieldValue}
            />
          </StyledStack>
          <StyledDialogActions spacebetween={"true"}>
            <DeleteButton
              disabled={isCreating || isEditing || isDeleting || !eventData}
              onClick={handleDelete}
            >
              {t("form.delete")}
            </DeleteButton>
            <FlexBox>
              <DialogButton
                disabled={isCreating || isEditing || isDeleting}
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {t("form.cancel")}
              </DialogButton>
              <DialogButton
                disabled={isCreating || isEditing || isDeleting || !dirty}
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
