import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DialogProvider } from "./context/DialogContext";
import { AuthProvider } from "./context/AuthProvider";
import { EventsProvider } from "./context/EventsContext";
import { AvailabilityProvider } from "./context/AvailabilityContext";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AvailabilityProvider>
        <DialogProvider>
          <EventsProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </AuthProvider>
          </EventsProvider>
        </DialogProvider>
      </AvailabilityProvider>
    </BrowserRouter>
  </React.StrictMode>
);
