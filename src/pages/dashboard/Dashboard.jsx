import React from "react";
import Header from "../../components/common/Header";
import PageWrapper from "./../../components/common/PageWrapper";
import CalendarComponent from "../../components/calendar/CalendarComponent";

const Dashboard = () => {
  return (
    <PageWrapper>
      <Header title="Календар" />
      <CalendarComponent />
    </PageWrapper>
  );
};

export default Dashboard;
