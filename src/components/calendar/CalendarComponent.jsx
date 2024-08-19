import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box } from "@mui/material";
import { scheduleData } from "../../data/scheduleData";
import { EventsContext } from "../../context/EventsContext";
import srLocale from "@fullcalendar/core/locales/sr-cyrl";
import { handleDateClick, handleEventClick } from "./helper/calendar-helper";
import { timeFormat } from "./helper/calendar-schema";
import "./Calendar.css";

const CalendarComponent = () => {
  const { setCurrentEvents } = useContext(EventsContext);

  return (
    <Box>
      <FullCalendar
        height="75vh"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        initialView="dayGridMonth"
        editable
        selectable
        selectMirror
        dayMaxEvents
        select={handleDateClick}
        eventClick={handleEventClick}
        eventsSet={(events) => setCurrentEvents(events)}
        initialEvents={scheduleData}
        locale={srLocale}
        eventTimeFormat={timeFormat}
        slotLabelFormat={timeFormat}
      />
    </Box>
  );
};

export default CalendarComponent;
