import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/header/Header";
import CalendarComponent from "../../components/calendar/CalendarComponent";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Header title="Календар" />
      <CalendarComponent />
    </Box>
  );
};

export default Dashboard;
