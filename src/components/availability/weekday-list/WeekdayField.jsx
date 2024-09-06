import React, { useMemo } from "react";
import { Checkbox, FormControlLabel, Typography, styled } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { orderBy } from "lodash";

import TimeSlot from "../time-slot/TimeSlot";
import "./Icon.css";

const sortSlots = (slotsList) => {
  return orderBy(
    slotsList,
    [(slot) => (slot.start === undefined ? Infinity : slot.start)],
    "asc"
  );
};

const WeekdayField = ({ day, timeSlots }) => {
  const isDayChecked = useMemo(() => Boolean(timeSlots?.length), [timeSlots]);
  const sortedTimeSlots = useMemo(() => sortSlots(timeSlots), [timeSlots]);
  return (
    <WeekDayContainer>
      <RowContainer>
        <RowContainer inner>
          <StyledFormLabel
            label={day}
            control={<StyledCheckbox checked={isDayChecked} />}
          />
          {isDayChecked ? (
            <Stack>
              {sortedTimeSlots.map((slot) => (
                <TimeSlot timeSlot={slot} key={`${day}-${slot.start}`} />
              ))}
            </Stack>
          ) : (
            <UnavailableText>Unavailable</UnavailableText>
          )}
        </RowContainer>
        {isDayChecked && (
          <FontAwesomeIcon className="icon plus" icon={faPlus} />
        )}
      </RowContainer>
    </WeekDayContainer>
  );
};

const WeekDayContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  marginTop: "5px",
  borderRadius: "5px",
  padding: "12px 10px 0",
  border: `1px solid ${theme.palette.mode === "dark" ? "#52525E" : "#c4c4c4"}`,
  justifyContent: "space-between",
  width: " 100%",
  "@media (max-width: 375px)": {
    padding: "12px 6px 0",
  },
}));

const RowContainer = styled("div")(({ inner = false }) => ({
  gap: "10px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: "10px",

  "@media (max-width: 600px)": {
    paddingLeft: inner ? 0 : "10px",
  },
  "@media (max-width: 375px)": {
    padding: inner ? 0 : "10px 0px",
  },
}));

const Stack = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
}));

const UnavailableText = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  height: "38px",
}));

const StyledFormLabel = styled(FormControlLabel)(() => ({
  textTransform: "capitalize",
  fontSize: "14px",
  fontWeight: "500",
  minWidth: "115.36px",
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.mode === "light" ? "#1E1E2D" : "#F2F4F7",
  },
}));

export default WeekdayField;
