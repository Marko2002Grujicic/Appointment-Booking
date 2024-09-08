import React from "react";
import AvailabilityModal from "../../components/availability/availability-modal/AvailabilityModal";
import Availability from "../../components/availability/Availability";
import Header from "./../../components/common/Header";
import PageWrapper from "./../../components/common/PageWrapper";

const Settings = () => {
  return (
    <PageWrapper>
      <Header title="Подешавања" />

      <Availability />
      {/* <AvailabilityModal /> */}
    </PageWrapper>
  );
};

export default Settings;
