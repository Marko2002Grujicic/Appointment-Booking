import React from "react";
import { useTranslation } from "react-i18next";
import Availability from "../../components/availability/Availability";
import Header from "./../../components/common/Header";
import PageWrapper from "./../../components/common/PageWrapper";

const Settings = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper>
      <Header title={t("pages.settings")} />
      <Availability />
    </PageWrapper>
  );
};

export default Settings;
