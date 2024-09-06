import React from "react";
import Header from "../../components/header/Header";
import CalendarComponent from "../../components/calendar/CalendarComponent";
import PageWrapper from "./../../components/header/PageWrapper";

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header title="Календар" />
      <CalendarComponent />
    </PageWrapper>
  );
};

export default Dashboard;
