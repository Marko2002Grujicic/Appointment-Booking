import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { HelperText } from "../date-picker/DatePicker";
import { filteredTimeSlots } from "../../../../helpers/generateTimeIntervals";

const TimeSelect = ({
  value,
  error,
  helperText,
  label,
  onChange,
  name,
  timeIntervals = [],
  disabled,
  selectedStartTime,
  isEnd = false,
  rawTimeIntervals = [],
}) => {
  let filteredTimeIntervals = timeIntervals;

  if (isEnd && selectedStartTime) {
    filteredTimeIntervals = filteredTimeSlots(
      rawTimeIntervals,
      timeIntervals,
      selectedStartTime
    );
  }

  return (
    <StyledFormControl color="secondary">
      <InputLabel>{label}</InputLabel>
      <Select
        disabled={disabled}
        color="secondary"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
      >
        {filteredTimeIntervals.map((timeInterval, index) => {
          const time = isEnd ? timeInterval.end : timeInterval.start;
          return (
            <MenuItem key={`${name}-${index}-${time}`} value={time}>
              {time}
            </MenuItem>
          );
        })}
      </Select>
      <HelperText helperText={helperText}>{helperText}</HelperText>
    </StyledFormControl>
  );
};

const StyledFormControl = styled(FormControl)(({ disabled }) => ({
  flex: 1,
  "& #mui-component-select-end": { cursor: disabled && "not-allowed" },
}));

export default TimeSelect;
