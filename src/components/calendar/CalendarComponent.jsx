import React, { useContext } from "react";
import { Box, styled } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import srLocale from "@fullcalendar/core/locales/sr-cyrl";

import { DialogContext } from "../../context/DialogContext";
import { handleDateClick } from "./helper/calendar-helper";
import { timeFormat } from "./helper/calendar-schema";
import { fetchData } from "../../helpers/fetch/fetch";
import "./Calendar.css";
import { useAppontments } from "../appointment-dialog/api/useAppointments";

const CalendarComponent = () => {
  const { isLoading, data: events, error } = useAppontments();
  const { setIsOpen, setSelectedEvent } = useContext(DialogContext);
  const toggleModal = () => setIsOpen(true);

  const handleEventClick = async (clickInfo) => {
    const eventId = Number(clickInfo.event.id);
    const url = `/appointments/${eventId}`;

    try {
      const eventData = await fetchData(url);
      setSelectedEvent({
        id: Number(eventData.id),
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        guests: eventData.guests || [],
        location: eventData.location || "",
        description: eventData.description || "",
      });
    } catch (error) {
      console.error("Error fetching event data:", error);
    }

    const popover = document.querySelector(".fc-popover");
    if (popover) {
      popover.style.display = "none";
    }

    toggleModal();
  };

  const plugins = [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    listPlugin,
  ];
  const toolbar = {
    left: "prev,next,today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  return (
    <StyledCalendarWrapper>
      <FullCalendar
        key={JSON.stringify(events)}
        height="75vh"
        plugins={plugins}
        headerToolbar={toolbar}
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        dayMaxEvents={5}
        eventClick={handleEventClick}
        select={handleDateClick}
        initialEvents={events}
        locale={srLocale}
        eventTimeFormat={timeFormat}
        slotLabelFormat={timeFormat}
      />
    </StyledCalendarWrapper>
  );
};

const StyledCalendarWrapper = styled(Box)(({ theme }) => ({
  "& .fc-theme-standard .fc-popover": {
    background: theme.palette.mode === "dark" ? "#2c3e50" : "#fff",
  },
}));

export default CalendarComponent;
