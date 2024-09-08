import React, { createContext, useState, useEffect } from "react";
import { fetchUserAvailability } from "../helpers/fetch/fetch";
import { getCookie } from "../helpers/cookies/cookies";

const AvailabilityContext = createContext();

const AvailabilityProvider = ({ children }) => {
  const [userAvailability, setUserAvailability] = useState(null);
  const [guestsAvailability, setGuestsAvailability] = useState(null);

  useEffect(() => {
    const userId = Number(getCookie("userId"));
    const fetchAvailability = async () => {
      try {
        const response = await fetchUserAvailability(userId);
        setUserAvailability(response);
      } catch (error) {
        console.error("Error fetching availability:", error.message);
      }
    };
    fetchAvailability();
  }, []);

  return (
    <AvailabilityContext.Provider
      value={{
        userAvailability,
        setUserAvailability,
        guestsAvailability,
        setGuestsAvailability,
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

export { AvailabilityProvider, AvailabilityContext };
