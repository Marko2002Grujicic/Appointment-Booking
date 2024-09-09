import React from "react";
import { faCheckCircle, faCancel } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatSecondsToTime } from "../../../../helpers/timeAdapters";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../helpers/colors";

const AvailabilityDay = ({ day, daySlots }) => {
  const { t } = useTranslation();
  const isDayEmpty = !daySlots || daySlots.length === 0;
  const shownIcon = isDayEmpty ? faCancel : faCheckCircle;
  const orderedSlots = daySlots
    ? [...daySlots].sort((slotA, slotB) => slotA.start - slotB.start)
    : [];
  return (
    <Wrapper>
      <DayLabel>
        <FontAwesomeIcon
          icon={shownIcon}
          style={{
            fontSize: "16px",
            color: isDayEmpty ? colors.error : colors.checkmark,
          }}
        />
        {day}
      </DayLabel>
      <TimeSlots>
        {orderedSlots.map((slot, index) => {
          return (
            <p key={slot.id}>
              <Time>{formatSecondsToTime(slot.start)}</Time>
              <Divider>-</Divider>
              <Time>{formatSecondsToTime(slot.end)}</Time>
              {orderedSlots.length - 1 !== index && (
                <And>{t("availability.and")}</And>
              )}
            </p>
          );
        })}
      </TimeSlots>
    </Wrapper>
  );
};

export default AvailabilityDay;

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  fontVariantNumeric: "tabular-nums",
  width: "100%",
  "@media all and (max-width: 768px)": {
    flexDirection: "column",
  },
});

const DayLabel = styled("p")({
  display: "flex",
  margin: 0,
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
  width: "116px",
  textTransform: "capitalize",
  "@media all and (max-width: 768px)": {
    width: "80px",
    marginRight: "6px",
  },
});

const TimeSlots = styled("div")({
  gap: "15px",
  display: "flex",
  flexDirection: "colum",
  alignitems: "flex-start",
  "@media all and (max-width: 768px)": {
    wordSpacing: 0,
    marginTop: "4px",
    alignItems: "center",
    width: "100%",
  },
  "& > p": {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    "@media all and (max-width: 375px)": {
      fontSize: "12px",
      wordSpacing: 0,
    },
    "@media all and (max-width: 768px)": {
      wordSpacing: 0,
      marginTop: "4px",
    },
  },
});

const Time = styled("span")({
  width: "65px",
  "@media all and (max-width: 375px)": {
    width: "57px",
  },
});

const Divider = styled("span")({
  margin: "0 5px",
});

const And = styled("span")({
  marginLeft: "15px",
});
