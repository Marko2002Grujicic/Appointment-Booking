import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { styled } from "@mui/system";
import { Formik } from "formik";
import { Stack, DialogActions, Button, TextField } from "@mui/material";
import { DialogContext } from "../../../context/DialogContext";
import { EventsContext } from "../../../context/EventsContext";
import { appointmentFormSchema } from "./appointmentFormSchema";
import { formatEventToAPI } from "./../../../helpers/formatEventToApi";
import { validateTimeSelection } from "./../../../helpers/validateTimeSelection";
import {
  fetchEvents,
  fetchUserAvailability,
  fetchUserEmails,
  editMeeting,
  createMeeting,
} from "../../../helpers/fetch/fetch";
import { generateTimeIntervals } from "./../../../helpers/timeAdapters";
import { getCookie } from "../../../helpers/cookies/cookies";
import DateTimePicker from "./date-time/DateTimePicker";
import Guests from "./guests/Guests";

const AppointmentForm = ({ eventData }) => {
  const userId = Number(getCookie("userId"));
  const { setIsOpen } = useContext(DialogContext);
  const { setEvents } = useContext(EventsContext);
  const [userAvailability, setUserAvailability] = useState(null);
  const [emailOptions, setEmailOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    eventData
      ? moment(eventData.start).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD")
  );
  const [timeIntervals, setTimeIntervals] = useState([]);
  const [rawTimeIntervals, setRawTimeIntervals] = useState([]);
  let isLoading = false;

  const initialValues = {
    title: eventData?.title || "",
    start: eventData ? moment(eventData.start).format("HH:mm") : "",
    end: eventData ? moment(eventData.end).format("HH:mm") : "",
    date: eventData
      ? moment(eventData.start).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD"),
    location: eventData?.location || "",
    guests: eventData ? JSON.parse(eventData.guests) : [],
    description: eventData?.description || "",
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await fetchUserAvailability(userId);
        setUserAvailability(response);
      } catch (error) {
        console.error("Error fetching availability:", error.message);
      }
    };
    const loadEmails = async () => {
      const emails = await fetchUserEmails();
      setEmailOptions(emails);
    };
    loadEmails();
    fetchAvailability();
  }, [userId]);

  useEffect(() => {
    if (userAvailability && Object.keys(userAvailability).length > 0) {
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

  const handleFormSubmit = async (newEvent) => {
    isLoading = true;
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
      if (eventData) {
        await editMeeting(eventData.id, formattedEvent);
      } else {
        await createMeeting(formattedEvent);
      }
    } catch (error) {
      console.error("Error submitting the event:", error.message);
    } finally {
      fetchEvents(setEvents);
      isLoading = false;
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
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
            <TextField
              fullWidth
              variant="outlined"
              color="secondary"
              type="text"
              label="Наслов"
              placeholder="Додајте наслов"
              name="title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(touched["title"]) && Boolean(errors["title"])}
              helperText={touched["title"] && errors["title"]}
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
            <TextField
              fullWidth
              variant="outlined"
              color="secondary"
              type="text"
              label="Локација"
              placeholder="Додајте место или линк"
              name="location"
              value={values.location}
              onBlur={handleBlur}
              onChange={handleChange}
              error={
                Boolean(touched["location"]) && Boolean(errors["location"])
              }
              helperText={touched["location"] && errors["location"]}
            />
            <Guests
              values={values}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              emailOptions={emailOptions}
            />
            <TextField
              label="Додатне информације..."
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
          <StyledDialogActions>
            <StyledButton onClick={() => setIsOpen((prev) => !prev)}>
              Откажи
            </StyledButton>
            <StyledButton disabled={isLoading} type="submit">
              Закажи
            </StyledButton>
          </StyledDialogActions>
        </FormContainer>
      )}
    </Formik>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === "light" ? "#1E1E2D" : "#F2F4F7",
}));
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  background: theme.palette.mode !== "light" ? "#1E1E2D" : "#F2F4F7",
}));

const FormContainer = styled("form")(() => ({
  width: "100%",
}));

const StyledStack = styled(Stack)(() => ({
  width: "100%",
  gap: "20px",
  marginTop: "10px",
}));

export default AppointmentForm;
