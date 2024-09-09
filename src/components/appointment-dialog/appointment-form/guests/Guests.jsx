import React from "react";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import HelperText from "../../../common/HelperText";
import { colors } from "../../../../helpers/colors";

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
      <Label error={Boolean(touched["guests"]) && Boolean(errors["guests"])}>
        {t("appointments.guests")}
      </Label>
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
      <HelperText helperText={errors["guests"] && t(`${errors["guests"]}`)} />
    </FormControl>
  );
};

export default Guests;

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
}));

const Label = styled(InputLabel)(({ error }) => ({
  colors: error && colors.error,
}));
