import React, { useState } from "react";
import { styled } from "@mui/system";
import { useUserAvailability } from "./helper/useUserAvailability";
import { AVAILABILITY_INITIAL_VALUES } from "../../helpers/constants";
import WorkingHours from "./working-hours/WorkingHours";
import { Button } from "@mui/material";
import { colors } from "../../helpers/colors";
import AvailabilityModal from "./availability-modal/AvailabilityModal";

const Availability = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useUserAvailability();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an Error</div>;

  return (
    <div>
      <Title>
        Ваша Доступност за састанке
        <EditButton
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Измени
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
