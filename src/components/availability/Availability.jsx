import React, { useState } from "react";
import { styled } from "@mui/system";
import { useUserAvailability } from "./api/useUserAvailability";
import { AVAILABILITY_INITIAL_VALUES } from "../../helpers/constants";
import WorkingHours from "./working-hours/WorkingHours";
import { Button } from "@mui/material";
import { colors } from "../../helpers/colors";
import AvailabilityModal from "./availability-modal/AvailabilityModal";
import { useTranslation } from "react-i18next";

const Availability = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isLoading, data, error } = useUserAvailability();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an Error</div>;

  return (
    <div>
      <Title>
        {t("availability.availabilityTitle")}
        <EditButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {t("form.edit")}
        </EditButton>
      </Title>
      <WorkingHours availability={data || AVAILABILITY_INITIAL_VALUES} />
      <AvailabilityModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Availability;

const Title = styled("p")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "26px",
  fontWeight: "bold",

  "@media all and (max-width: 1000px)": {
    fontSize: "20px",
  },
  "@media all and (max-width: 375px)": {
    fontSize: "14px",
    marginRight: "20px",
  },
});

const EditButton = styled(Button)(({ theme }) => ({
  background:
    theme.palette.mode !== "light" ? colors.light.primary : colors.dark.primary,
}));
