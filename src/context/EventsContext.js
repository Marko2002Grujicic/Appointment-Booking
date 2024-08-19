import React, { createContext, useState } from "react";

const EventsContext = createContext();

const EventsProvider = ({ children }) => {
  const [currentEvents, setCurrentEvents] = useState([]);

  return (
    <EventsContext.Provider value={{ currentEvents, setCurrentEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsProvider, EventsContext };
