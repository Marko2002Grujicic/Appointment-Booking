import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { Formik } from "formik";
import { styled } from "@mui/system";
import {
  Stack,
  Chip,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DatePicker from "./date-picker/DatePicker";
import { DialogContext } from "../../../context/DialogContext";
import { EventsContext } from "../../../context/EventsContext";
import { appointmentFormSchema } from "./appointmentFormSchema";
import TimeSelect from "./time-select/TimeSelect";
import { formatEventToAPI } from "./../../../helpers/formatEventToApi";
import { validateTimeSelection } from "./../../../helpers/validateTimeSelection";
import {
  fetchEvents,
  fetchUserAvailability,
  fetchUserEmails,
  editMeeting,
  createMeeting,
} from "../../../helpers/fetch/fetch";
import { generateTimeIntervals } from "./../../../helpers/generateTimeIntervals";
import { getCookie } from "../../../helpers/cookies/cookies";

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
            <DatePicker
              value={values.date}
              onBlur={handleBlur}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setFieldValue("date", e.target.value);
              }}
              error={Boolean(touched["date"]) && Boolean(errors["date"])}
              helperText={touched["date"] && errors["date"]}
            />
            <FlexBox>
              <TimeSelect
                name="start"
                label="Почетак"
                disabled={!Boolean(selectedDate)}
                value={values.start}
                onChange={handleChange}
                error={Boolean(touched["start"]) && Boolean(errors["start"])}
                helperText={touched["start"] && errors["start"]}
                timeIntervals={timeIntervals}
              />
              <TimeSpan>до</TimeSpan>
              <TimeSelect
                label="Крај"
                name="end"
                disabled={!Boolean(values.start)}
                value={values.end}
                onChange={handleChange}
                error={Boolean(touched["end"]) && Boolean(errors["end"])}
                helperText={touched["end"] && errors["end"]}
                selectedStartTime={values.start}
                rawTimeIntervals={rawTimeIntervals}
                isEnd
                timeIntervals={timeIntervals}
              />
            </FlexBox>
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
            <FormControl>
              <InputLabel>Гости</InputLabel>
              <Select
                multiple
                value={values.guests}
                onChange={(event) =>
                  setFieldValue("guests", event.target.value)
                }
                onBlur={handleBlur}
                renderValue={(selected) =>
                  Array.isArray(selected) ? (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} style={{ margin: 2 }} />
                      ))}
                    </div>
                  ) : null
                }
                error={Boolean(touched["guests"]) && Boolean(errors["guests"])}
                placeholder="Унесите Емаил адресе"
                variant="outlined"
                label="Гости"
                name="guests"
              >
                {emailOptions.map((email) => (
                  <MenuItem key={email} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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

const FlexBox = styled("span")(() => ({
  display: "flex",
  alignItems: "flex-start",
  flexGrow: 1,
  justifyContent: "center",
}));

const TimeSpan = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  margin: "0 8px",
  marginTop: "15px",
}));

export default AppointmentForm;
