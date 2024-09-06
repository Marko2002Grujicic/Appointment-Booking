import React from "react";
import WeekdayField from "./WeekdayField";
import { styled } from "@mui/material";

const WEEK_DAYS = Object.freeze({
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
});

const WeekdayList = ({ availability }) => {
  return (
    <Wrapper>
      {Object.values(WEEK_DAYS).map((day) => (
        <WeekdayField
          key={`${day}-${day.start}`}
          day={day}
          timeSlots={availability[day]}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}));

export default WeekdayList;
