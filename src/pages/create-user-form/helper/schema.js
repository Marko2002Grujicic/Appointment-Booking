import * as yup from "yup";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const userSchema = yup.object().shape({
  firstName: yup.string().required("Поље је обавезно"),
  lastName: yup.string().required("Поље је обавезно"),
  email: yup
    .string()
    .email("Адреса Е-поште није валидна")
    .required("Поље је обавезно"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Број телефона није валидан")
    .required("Поље је обавезно"),
  password: yup.string().required("Поље је обавезно"),
});
