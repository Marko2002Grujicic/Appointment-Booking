import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fetchData } from "./helpers/API/API_CALLS";
import { getCookie } from "./helpers/cookies/cookies";

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
      en: {
        translation: {
          day: {
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday",
          },
          form: {
            start: "Start",
            end: "End",
            to: "to",
            delete: "Delete",
            cancel: "Cancel",
            submit: "Save",
            edit: "Edit",
            password: "Password",
            registrate: "Registrate",
            login: "Login",
            name: "First and Last name",
            email: "Email",
          },
          appointments: {
            title: "Title",
            addTitle: "Add a title",
            location: "Location",
            addLocation: "Add location or link",
            guests: "Guests",
            description: "Additional information...",
            editAppointment: "Edit Appointment",
            createAppointment: "Create Appointment",
            noAvailability: "There are no available slots for the selected day",
            sendNotification: "Send a notification to guests",
          },
          availability: {
            availabilityTitle: "Your Appointment availability",
            and: "and",
            editAvailability: "Edit Availability",
          },
          pages: {
            settings: "Settings",
            calendar: "Calendar",
          },
          errors: {
            startBeforeEnd: "Start time must be before end time",
            required: "Field is required",
            availabilityNoOverlaps: "Availability can't be overlapping",
            dateNoPast: "Date can't be in the past",
            minGuest: "Enter min one guests",
            wrongFormat: "Wrong email format",
            emailInUse: "Email is already in use",
          },
        },
      },
      rs: {
        translation: {
          day: {
            monday: "Понедељак",
            tuesday: "Уторак",
            wednesday: "Среда",
            thursday: "Четвртак",
            friday: "Петак",
            saturday: "Субота",
            sunday: "Недеља",
          },
          form: {
            start: "Почетак",
            end: "Крај",
            to: "до",
            delete: "Обриши",
            cancel: "Откажи",
            submit: "Сачувај",
            edit: "Измени",
            password: "Шифра",
            registrate: "Региструј се",
            login: "Улогуј се",
            name: "Име и Презиме",
            email: "Е-пошта",
          },
          appointments: {
            title: "Наслов",
            addTitle: "Додајте наслов",
            location: "Локација",
            addLocation: "Додајте место или линк",
            guests: "Гости",
            description: "Додатне информације...",
            editAppointment: "Измени Састанак",
            createAppointment: "Креирајте Састанак",
            noAvailability: "Нема слободних термина за изабрани дан",
            sendNotification: "Пошаљите обавештење гостима",
          },
          availability: {
            availabilityTitle: "Ваша Доступност за састанке",
            and: "и",
            editAvailability: "Измените Доступност",
          },
          pages: {
            settings: "Подешавања",
            calendar: "Календар",
          },
          errors: {
            startBeforeEnd: "Почетно време мора бити пре крањег",
            required: "Поље је обавезно",
            availabilityNoOverlaps: "Доступност не сме да се преклапа",
            dateNoPast: "Датум не сме бити у прошлости",
            minGuest: "Унесите минимум једног госта",
            wrongFormat: "Погрешан формат мејла",
            emailInUse: "Имејл је већ у употреби",
          },
        },
      },
    },
  });
};

export default initializeI18n;
