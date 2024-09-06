import React from "react";
import { styled, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const formatAPITime = (timeSlot) => {
  if (!timeSlot) return;

  const formatTime = (timeInSeconds) => {
    const totalHours = timeInSeconds / 3600;
    const wholeHours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - wholeHours) * 60);

    const formattedHours = wholeHours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  return {
    start: formatTime(timeSlot.start),
    end: formatTime(timeSlot.end),
  };
};

const TimeSlot = ({ timeSlot }) => {
  const formattedTime = formatAPITime(timeSlot);
  return (
    <TimeSlotWrapper>
      <TimeField type="time" value={formattedTime.start} />
      <span>-</span>
      <TimeField type="time" value={formattedTime.end} />
      <FontAwesomeIcon className="icon trash" icon={faTrash} />
    </TimeSlotWrapper>
  );
};

const TimeSlotWrapper = styled("div")(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

const TimeField = styled(TextField)(() => ({
  "& .css-1j0gqx-MuiInputBase-root-MuiOutlinedInput-root, .css-14lyeul-MuiInputBase-root-MuiOutlinedInput-root":
    {
      height: "34px",
    },
}));

export default TimeSlot;
