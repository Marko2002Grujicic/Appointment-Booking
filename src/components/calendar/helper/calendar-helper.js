export const handleEventClick = (selected) => {
  if (
    window.confirm(
      `Are you sure you want to delete the event ${selected.event.title}`
    )
  ) {
    selected.event.remove();
  }
};
export const handleDateClick = (selected) => {
  const title = prompt("Please enter a new title for your event");
  const calendarApi = selected.view.calendar;
  calendarApi.unselect();

  if (title) {
    calendarApi.addEvent({
      id: `${selected.dateStr}-${title}`,
      title,
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
  }
};
