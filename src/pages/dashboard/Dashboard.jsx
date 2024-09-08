import React from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/common/Header";
import PageWrapper from "./../../components/common/PageWrapper";
import CalendarComponent from "../../components/calendar/CalendarComponent";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <Header title={t("pages.calendar")} />
      <CalendarComponent />
    </PageWrapper>
  );
};

export default Dashboard;
