import * as yup from "yup";

export const registrationForm = {
  initialValues: {
    name: "",
    email: "",
    password: "",
    preferred_language: "rs",
  },
  formFields: {
    name: {
      key: "name",
    },
    email: {
      key: "email",
    },
    password: {
      key: "password",
    },
    preferred_language: {
      key: "password",
    },
  },
  schema: yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("wrongFormat").required("requried"),
    password: yup.string().required("required"),
  }),
};

export const loginForm = {
  initialValues: {
    email: "",
    password: "",
  },
  formFields: {
    email: {
      key: "email",
    },
    password: {
      key: "password",
    },
  },
  schema: yup.object().shape({
    email: yup.string().email("wrongFormat").required("required"),
    password: yup.string().required("required"),
  }),
};
