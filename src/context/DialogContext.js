import React, { createContext, useState } from "react";

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <DialogContext.Provider
      value={{ isOpen, setIsOpen, selectedEvent, setSelectedEvent }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };
