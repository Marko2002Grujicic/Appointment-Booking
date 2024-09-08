import React from "react";
import { styled } from "@mui/system";
import { WEEK_DAYS } from "../../../helpers/constants";
import AvailabilityDay from "./availability-day/AvailabilityDay";
import { colors } from "../../../helpers/colors";

const WorkingHours = ({ availability }) => {
  const dailySLots = Object.values(WEEK_DAYS).map((day) => ({
    label: day,
    slots: !availability ? [] : availability[day],
  }));
  return (
    <Wrapper>
      {dailySLots.map((slot) => {
        return (
          <AvailabilityDay
            key={slot.label}
            daySlots={slot.slots}
            day={slot.label}
          />
        );
      })}
    </Wrapper>
  );
};

export default WorkingHours;

const Wrapper = styled("div")(({ theme }) => ({
  gap: "15px",
  width: "100%",
  display: "flex",
  paddingBottom: "15px",
  flexDirection: "column",
  borderBottom: `1px solid ${
    theme.palette.mode !== "dark" ? colors.dark.primary : colors.light.primary
  }`,
}));
