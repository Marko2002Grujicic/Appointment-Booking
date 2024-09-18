import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fetchData } from "./helpers/API/API_CALLS";
import { getCookie } from "./helpers/cookies/cookies";
import { en } from "./translations/en";
import { rs } from "./translations/rs";

const initializeI18n = async () => {
  const userId = getCookie("userId");
  const url = `/user/${userId}`;
  const data = await fetchData(url);

  const userLanguage = data ? data[0].preferred_language : "rs";

  i18n.use(initReactI18next).init({
    fallbackLng: "rs",
    lng: userLanguage,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      rs,
    },
  });
};

export default initializeI18n;
