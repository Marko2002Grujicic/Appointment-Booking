import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DialogProvider } from "./context/DialogContext";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App";
import "./index.css";
import { EventsProvider } from "./context/EventsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DialogProvider>
        <EventsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </EventsProvider>
      </DialogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
