import moment from "moment";

export const formatEventToAPI = (event) => {
  const start = moment(`${event.date} ${event.start}`).format(
    "YYYY-MM-DD HH:mm"
  );
  const end = moment(`${event.date} ${event.end}`).format("YYYY-MM-DD HH:mm");

  return {
    title: event.title,
    start,
    end,
    location: event.location,
    guests: JSON.stringify(event.guests),
    description: event.description,
    sendNotification: event.sendNotification,
  };
};
