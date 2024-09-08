import moment from "moment";
import * as yup from "yup";

const now = moment().startOf("day");

export const appointmentFormSchema = yup.object().shape({
  title: yup.string().required("Поље је обавезно"),
  start: yup.string().required("Поље је обавезно"),
  end: yup.string().required("Поље је обавезно"),
  date: yup
    .date()
    .required("Поље је обавезно")
    .min(now, "Датум не сме бити у прошлости"),
  location: yup.string().required("Поље је обавезно"),
  guests: yup
    .array()
    .of(yup.string().email("Погрешан формат мејла"))
    .min(1, "Унесите минимум једног госта")
    .required("Поље је обавезно"),
  description: yup.string().optional(),
});
