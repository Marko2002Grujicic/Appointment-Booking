import React from "react";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const Guests = ({
  values,
  setFieldValue,
  handleBlur,
  touched,
  errors,
  emailOptions,
}) => {
  const { t } = useTranslation();
  return (
    <FormControl>
      <InputLabel>{t("appointments.guests")}</InputLabel>
      <Select
        multiple
        value={values.guests}
        onChange={(event) => setFieldValue("guests", event.target.value)}
        onBlur={handleBlur}
        renderValue={(selected) =>
          Array.isArray(selected) ? (
            <Wrapper>
              {selected.map((value) => (
                <Chip key={value} label={value} style={{ margin: 2 }} />
              ))}
            </Wrapper>
          ) : null
        }
        error={Boolean(touched["guests"]) && Boolean(errors["guests"])}
        variant="outlined"
        label={t("appointments.guests")}
        name="guests"
      >
        {emailOptions.map((email) => (
          <MenuItem key={email} value={email}>
            {email}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Guests;

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
}));
