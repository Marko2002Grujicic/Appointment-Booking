import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { formatSecondsToTime, timeToMinutes } from "../../helpers/timeAdapters";

const TimePicker = ({ value, onTimeChange }) => {
  const createTimeStamp = useCallback((time) => formatSecondsToTime(time), []);

  const handleInputChange = useCallback(
    (event) => {
      const timeValue = event.target.value;
      if (timeValue === "") return;
      const timeInSeconds = timeToMinutes(timeValue) * 60;
      onTimeChange(timeInSeconds);
    },
    [onTimeChange]
  );

  return (
    <TimeField
      type="time"
      value={createTimeStamp(value)}
      onChange={handleInputChange}
    />
  );
};

export default TimePicker;

const TimeField = styled(TextField)(() => ({
  "& .MuiInputBase-root-MuiOutlinedInput-root": {
    height: "34px",
  },
}));
