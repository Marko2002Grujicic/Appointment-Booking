import moment from "moment";
import * as yup from "yup";

const now = moment().startOf("day");

export const appointmentFormSchema = yup.object().shape({
  title: yup.string().required("required"),
  start: yup.string().required("required"),
  end: yup.string().required("required"),
  date: yup.date().required("required").min(now, "dateNoPast"),
  location: yup.string().required("required"),
  guests: yup
    .array()
    .of(yup.string().email("wrongFormat"))
    .min(1, "minGuest")
    .required("required"),
  description: yup.string().optional(),
});
