import React, { createContext, useState } from "react";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider, EventsContext };
