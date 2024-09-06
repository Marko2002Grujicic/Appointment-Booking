import moment from "moment";

export const validateTimeSelection = (
  date,
  startTime,
  endTime,
  availability
) => {
  const dayOfWeek = moment(date).format("dddd").toLowerCase();
  const startSeconds = moment.duration(startTime).asSeconds();
  const endSeconds = moment.duration(endTime).asSeconds();

  if (!availability[dayOfWeek]) return false;

  return availability[dayOfWeek].some((slot) => {
    return startSeconds >= slot.start && endSeconds <= slot.end;
  });
};
