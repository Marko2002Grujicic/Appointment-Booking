import React, { createContext, useState } from "react";

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

export { DialogProvider, DialogContext };
