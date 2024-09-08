import React from "react";
import { styled } from "@mui/system";
import { FormControlLabel, Checkbox, Stack } from "@mui/material";
import { Field } from "formik";
import { uniqueId } from "lodash";
import TimeSlot from "../time-slot/TimeSlot";
import { colors } from "../../../../../helpers/colors";
import { useTranslation } from "react-i18next";

const WeekdayField = ({ day, setFieldValue, errors }) => {
  const { t } = useTranslation();
  const handleTimeChange = (updatedSlots) => {
    setFieldValue(day, updatedSlots);
  };

  const defaultTime = [{ id: uniqueId(), start: 32400, end: 61200 }];

  const overlapError = typeof errors !== "object";

  return (
    <Field name={day}>
      {({ field }) => {
        const { value } = field;
        return (
          <WeekDayContainer>
            <RowContainer>
              <FormLabel
                control={<Checkbox checked={Boolean(value?.length)} />}
                label={t(`day.${day}`)}
                onChange={(event) =>
                  handleTimeChange(event.target.checked ? defaultTime : [])
                }
              />
              <SlotStack>
                {value?.map((slot, index) => (
                  <TimeSlot
                    key={`${slot}-${index}`}
                    day={day}
                    index={index}
                    value={slot}
                    errors={
                      overlapError ? errors : (errors && errors[index]) || ""
                    }
                    onDelete={(id) => {
                      const updatedSlots = value.filter((s) => s.id !== id);
                      handleTimeChange(updatedSlots);
                    }}
                  />
                ))}
              </SlotStack>
            </RowContainer>
          </WeekDayContainer>
        );
      }}
    </Field>
  );
};

export default WeekdayField;

const WeekDayContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  marginTop: "5px",
  borderRadius: "5px",
  padding: "12px 10px 0",
  border: `1px solid ${
    theme.palette.mode === "dark" ? colors.dark.border : colors.light.border
  }`,
  justifyContent: "space-between",
  width: " 100%",
  "@media (max-width: 375px)": {
    padding: "12px 6px 0",
  },
}));

const RowContainer = styled("div")({
  gap: "10px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  padding: "10px",

  "@media (max-width: 600px)": {
    paddingLeft: "10px",
  },
  "@media (max-width: 375px)": {
    padding: "10px 0px",
  },
});

const SlotStack = styled(Stack)({
  gap: "10px",
});

const FormLabel = styled(FormControlLabel)({
  textTransform: "capitalize",
  width: "110px",
});
