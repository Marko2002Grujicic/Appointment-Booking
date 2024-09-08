import React from "react";
import { styled } from "@mui/material";
import WeekdayField from "./weekday-field/WeekdayField";
import { WEEK_DAYS } from "../../../../helpers/constants";

const WeekdayList = ({ setFieldValue, errors }) => {
  return (
    <Wrapper>
      {Object.values(WEEK_DAYS).map((day) => (
        <WeekdayField
          key={day}
          day={day}
          setFieldValue={setFieldValue}
          errors={errors[day]}
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
