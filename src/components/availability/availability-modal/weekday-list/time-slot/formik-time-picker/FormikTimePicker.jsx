import React from "react";
import { Field } from "formik";
import { styled } from "@mui/system";
import TimePicker from "../../../../../common/TimePicker";
import { HelperText } from "../../../../../appointment-dialog/appointment-form/date-time/date-picker/DatePicker";

const FormikTimePicker = ({
  name,
  value,
  isStart = false,
  index,
  errors,
  shrinkInput,
}) => {
  const Container = styled("div")({
    height: shrinkInput ? "auto" : "72px",
  });

  return (
    <Field name={name}>
      {({ form, field }) => {
        const handleTimeChange = (time) => {
          const newValue = [...field.value];

          if (isStart) {
            newValue[index] = { ...newValue[index], start: time };
          } else {
            newValue[index] = { ...newValue[index], end: time };
          }

          form.setFieldValue(name, newValue);
        };

        return (
          <Container>
            <TimePicker
              value={value}
              onTimeChange={handleTimeChange}
              errors={errors}
            />
            <HelperText helperText={true}>{errors}</HelperText>
          </Container>
        );
      }}
    </Field>
  );
};

export default FormikTimePicker;
