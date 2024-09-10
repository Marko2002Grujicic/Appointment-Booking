import React from "react";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import { useInvalidateGuestsAvailabilities } from "../../../../helpers/API/guests/useGuestsAvailabilities";

import { colors } from "../../../../helpers/colors";
import HelperText from "../../../common/HelperText";

const Guests = ({
  values,
  setFieldValue,
  handleBlur,
  touched,
  errors,
  emailOptions,
  isGuestsLoading,
  setSelectedGuests,
  userEmail,
}) => {
  const { t } = useTranslation();
  const invalidateGuestsAvailability = useInvalidateGuestsAvailabilities();

  const handleGuestChange = (event) => {
    const selectedGuests = event.target.value;

    setFieldValue("guests", selectedGuests);
    setFieldValue("start", "");
    setFieldValue("end", "");
    invalidateGuestsAvailability(values.guests);
    setSelectedGuests(selectedGuests);
  };

  return (
    <FormControl>
      <Label error={Boolean(touched["guests"]) && Boolean(errors["guests"])}>
        {t("appointments.guests")}
      </Label>
      <Select
        disabled={isGuestsLoading}
        multiple
        value={values.guests}
        onChange={(event) => {
          handleGuestChange(event);
        }}
        onBlur={handleBlur}
        renderValue={(selected) =>
          Array.isArray(selected) ? (
            <Wrapper>
              {selected.map((value, index) => (
                <StyledChip
                  key={`${index}-${value}`}
                  label={value}
                  color={value === userEmail ? "primary" : "default"}
                />
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
          <MenuItem key={email} disabled={email === userEmail} value={email}>
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

const StyledChip = styled(Chip)({
  margin: "8px",
});
