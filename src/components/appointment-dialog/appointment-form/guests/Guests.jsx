import React from "react";
import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";
import HelperText from "../../../common/HelperText";
import { colors } from "../../../../helpers/colors";
import { useInvalidateGuestsAvailabilities } from "../../../../helpers/API/guests/useGuestsAvailabilities";

const Guests = ({
  values,
  setFieldValue,
  handleBlur,
  touched,
  errors,
  emailOptions,
  isGuestsLoading,
  setSelectedGuests,
}) => {
  const { t } = useTranslation();
  const invalidateGuestsAvailability = useInvalidateGuestsAvailabilities();
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
          const newGuests = event.target.value;
          setFieldValue("guests", newGuests);
          setFieldValue("start", "");
          setFieldValue("end", "");
          invalidateGuestsAvailability(values.guests);
          setSelectedGuests(newGuests);
        }}
        onBlur={handleBlur}
        renderValue={(selected) =>
          Array.isArray(selected) ? (
            <Wrapper>
              {selected.map((value, index) => (
                <StyledChip key={`${index}-${value}`} label={value} />
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

const StyledChip = styled(Chip)({
  margin: "8px",
});
