import React, { useState } from "react";
import moment from "moment";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Chip,
  Autocomplete,
  FormControl,
  InputLabel,
} from "@mui/material";
import DatePicker from "../date-picker/DatePicker";
import TextArea from "../text-area/TextArea";

const AppointmentForm = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [emails, setEmails] = useState([]);

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
    <Stack gap="20px" mt="10px">
      <TextField
        fullWidth
        variant="outlined"
        color="secondary"
        type="text"
        label="Наслов"
        placeholder="Додајте наслов"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "10px",
        }}
      >
        <DatePicker
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <FormControl sx={{ flex: 1 }} color="secondary">
          <InputLabel>Почетак</InputLabel>
          <Select
            color="secondary"
            label="Почетак"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          >
            {timeIntervals.map((value) => (
              <MenuItem key={`start-time-${value}`} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <span style={{ display: "flex", alignItems: "center" }}>до</span>
        <FormControl sx={{ flex: 1 }} color="secondary">
          <InputLabel>Крај</InputLabel>
          <Select
            value={endTime}
            placeholder="End Time"
            label="Крај"
            color="secondary"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          >
            {timeIntervals.map((value) => (
              <MenuItem key={`end-time-${value}`} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        color="secondary"
        value={emails}
        onChange={(event, newValue) => {
          setEmails(newValue);
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
    </Stack>
  );
};

export default AppointmentForm;
