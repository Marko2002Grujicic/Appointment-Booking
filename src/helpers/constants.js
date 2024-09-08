import { uniqueId } from "lodash";

export const AVAILABILITY_INITIAL_VALUES = {
  monday: [{ start: 32400, end: 61200, id: uniqueId() }],
  tuesday: [{ start: 32400, end: 61200, id: uniqueId() }],
  wednesday: [{ start: 32400, end: 61200, id: uniqueId() }],
  thursday: [{ start: 32400, end: 61200, id: uniqueId() }],
  friday: [{ start: 32400, end: 61200, id: uniqueId() }],
  saturday: [],
  sunday: [],
};

export const WEEK_DAYS = Object.freeze({
  MONDAY: "monday",
  TUESDAY: "tuesday",
  WEDNESDAY: "wednesday",
  THURSDAY: "thursday",
  FRIDAY: "friday",
  SATURDAY: "saturday",
  SUNDAY: "sunday",
});
