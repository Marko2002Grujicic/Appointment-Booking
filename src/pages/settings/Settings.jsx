import React from "react";
import Availability from "../../components/availability/Availability";
import Header from "./../../components/header/Header";
import PageWrapper from "./../../components/header/PageWrapper";

const Settings = () => {
  return (
    <PageWrapper>
      <Header title="Подешавања" />
      <Availability />
    </PageWrapper>
  );
};

export default Settings;
