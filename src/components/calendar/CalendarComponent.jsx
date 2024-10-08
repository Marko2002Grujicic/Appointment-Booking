import React, { useContext, useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import srLocale from "@fullcalendar/core/locales/sr-cyrl";
import enLocale from "@fullcalendar/core/locales/en-gb";

import { useAppontments } from "../appointment-dialog/api/useAppointments";
import { useUserData } from "../../helpers/API/user/useUserData";
import { DialogContext } from "../../context/DialogContext";
import { fetchData } from "../../helpers/API/API_CALLS";
import { handleDateClick } from "./helper/calendar-helper";
import { timeFormat } from "./helper/calendar-schema";
import { colors } from "../../helpers/colors";
import "./Calendar.css";

const CalendarComponent = () => {
  const { isLoading, data: events, error } = useAppontments();
  const { setIsOpen, setSelectedEvent } = useContext(DialogContext);
  const { data: userData } = useUserData();
  const [userLanguage, setUserLanguage] = useState("en");

  useEffect(() => {
    if (!userData) return;
    setUserLanguage(userData.preferred_language);
  }, [userData]);

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

  const calendarLocale = userLanguage === "en" ? enLocale : srLocale;

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
        dayMaxEvents={4}
        eventClick={handleEventClick}
        select={handleDateClick}
        initialEvents={events}
        locale={calendarLocale}
        eventTimeFormat={timeFormat}
        slotLabelFormat={timeFormat}
      />
    </StyledCalendarWrapper>
  );
};

const StyledCalendarWrapper = styled(Box)(({ theme }) => ({
  "& .fc-button": {
    textTransform: "capitalize",
  },
  "& .fc-theme-standard .fc-popover": {
    background: theme.palette.mode === "dark" ? "#2c3e50" : "#fff",
  },
  "& .fc-direction-ltr .fc-list-day-side-text, .fc-direction-rtl .fc-list-day-text":
    {
      color:
        theme.palette.mode === "dark"
          ? colors.dark.primary
          : colors.light.primary,
    },
}));

export default CalendarComponent;
