import React, { createContext, useState } from "react";
import { scheduleData } from "../data/scheduleData";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [currentEvents, setCurrentEvents] = useState(scheduleData);

  return (
    <EventsContext.Provider value={{ currentEvents, setCurrentEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider, EventsContext };
