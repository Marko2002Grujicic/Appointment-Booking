import * as yup from "yup";

export const registrationForm = {
  initialValues: {
    name: "",
    email: "",
    password: "",
  },
  formFields: {
    name: {
      label: "Име и Презиме",
      key: "name",
    },
    email: {
      label: "Е-пошта",
      key: "email",
    },
    password: {
      label: "Шифра",
      key: "password",
    },
  },
  schema: yup.object().shape({
    name: yup.string().required("Поље је обавезно"),
    email: yup
      .string()
      .email("Адреса Е-поште није валидна")
      .required("Поље је обавезно"),
    password: yup.string().required("Поље је обавезно"),
  }),
};

export const loginForm = {
  initialValues: {
    email: "",
    password: "",
  },
  formFields: {
    email: {
      label: "Е-пошта",
      key: "email",
    },
    password: {
      label: "Шифра",
      key: "password",
    },
  },
  schema: yup.object().shape({
    email: yup
      .string()
      .email("Адреса Е-поште није валидна")
      .required("Поље је обавезно"),
    password: yup.string().required("Поље је обавезно"),
  }),
};
