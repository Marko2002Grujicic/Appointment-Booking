import React from "react";
import Availability from "../../components/availability/Availability";
import Header from "./../../components/common/Header";
import PageWrapper from "./../../components/common/PageWrapper";

const Settings = () => {
  return (
    <PageWrapper>
      <Header title="Подешавања" />
      <Availability />
    </PageWrapper>
  );
};

export default Settings;
