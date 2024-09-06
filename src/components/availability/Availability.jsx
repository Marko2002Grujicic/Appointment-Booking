import { Formik } from "formik";
import React from "react";
import { Typography } from "@mui/material";
import availabilityData from "./../../pages/settings/availabilityMockData";
import WeekdayList from "./weekday-list/WeekdayList";

const Availability = () => {
  return (
    <Formik>
      <form>
        <Typography variant="h3">Podesite Vasu dostupnost</Typography>
        <WeekdayList availability={availabilityData} />
      </form>
    </Formik>
  );
};

export default Availability;
