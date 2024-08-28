import React, { useContext } from "react";
import moment from "moment";
import { Formik } from "formik";
import { styled } from "@mui/system";
import {
  Stack,
  MenuItem,
  Select,
  Chip,
  Autocomplete,
  FormControl,
  InputLabel,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DatePicker from "../date-picker/DatePicker";
import TextArea from "../text-area/TextArea";
import { EventsContext } from "../../../context/EventsContext";

export const FormContainer = styled("form")(() => ({
  width: "100%",
}));
export const StyledStack = styled(Stack)(() => ({
  width: "100%",
  gap: "20px",
  marginTop: "10px",
}));

const FlexBox = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  gap: "10px",
}));

const TimeSpan = styled("span")(() => ({
  display: "flex",
  alignItems: "center",
}));

const AppointmentForm = ({ reversedColor, defaultColor, toggleModal }) => {
  const { currentEvents, setCurrentEvents } = useContext(EventsContext);

  const initialValues = {
    title: "",
    startTime: "",
    endTime: "",
    date: moment().format("YYYY-MM-DD"),
    emails: [],
  };

  const handleFormSubmit = (values) => {
    // TODO SET UP CREATING EVENTS
    console.log(values);
    toggleModal();
    const previousEvents = currentEvents;
    setCurrentEvents(...previousEvents, values);
    console.log(currentEvents);
  };

  const timeIntervals = [
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
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
            />
            <FlexBox>
              <DatePicker
                value={values.date}
                onChange={(e) => setFieldValue("date", e.target.value)}
              />
              <FormControl sx={{ flex: 1 }} color="secondary">
                <InputLabel>Почетак</InputLabel>
                <Select
                  color="secondary"
                  label="Почетак"
                  name="startTime"
                  value={values.startTime}
                  onChange={handleChange}
                >
                  {timeIntervals.map((value) => (
                    <MenuItem key={`start-time-${value}`} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TimeSpan>до</TimeSpan>
              <FormControl sx={{ flex: 1 }} color="secondary">
                <InputLabel>Крај</InputLabel>
                <Select
                  value={values.endTime}
                  placeholder="End Time"
                  label="Крај"
                  name="endTime"
                  color="secondary"
                  onChange={handleChange}
                >
                  {timeIntervals.map((value) => (
                    <MenuItem key={`end-time-${value}`} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FlexBox>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              color="secondary"
              value={values.emails}
              onChange={(event, newValue) => {
                setFieldValue("emails", newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  color="secondary"
                  label="Гости"
                  placeholder="Унесите Емаил адресе"
                />
              )}
            />
            <TextArea />
          </StyledStack>
          <DialogActions sx={{ background: defaultColor }}>
            <Button
              sx={{
                color: reversedColor,
              }}
              onClick={toggleModal}
            >
              Откажи
            </Button>
            <Button
              sx={{
                color: reversedColor,
              }}
              type="submit"
            >
              Закажи
            </Button>
          </DialogActions>
        </FormContainer>
      )}
    </Formik>
  );
};

export default AppointmentForm;
