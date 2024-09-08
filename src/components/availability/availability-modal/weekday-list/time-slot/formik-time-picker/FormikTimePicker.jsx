import React from "react";
import { Field } from "formik";
import { styled } from "@mui/system";
import TimePicker from "../../../../../common/TimePicker";
import HelperText from "../../../../../common/HelperText";

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
            <TimePicker value={value} onTimeChange={handleTimeChange} />
            <HelperText helperText={errors} />
          </Container>
        );
      }}
    </Field>
  );
};

export default FormikTimePicker;
