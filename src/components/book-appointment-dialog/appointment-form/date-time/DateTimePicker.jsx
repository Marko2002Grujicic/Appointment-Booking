import React from "react";
import { styled } from "@mui/system";
import DatePicker from "./date-picker/DatePicker";
import TimeSelect from "./time-select/TimeSelect";

const DateTimePicker = ({
  values,
  errors,
  touched,
  timeIntervals,
  handleChange,
  rawTimeIntervals,
  handleBlur,
  selectedDate,
  setSelectedDate,
  setFieldValue,
}) => {
  return (
    <Container>
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
    </Container>
  );
};

export default DateTimePicker;

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

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
