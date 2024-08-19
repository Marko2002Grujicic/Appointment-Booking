import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext";
import { DialogProvider } from "./context/DialogContext";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DialogProvider>
        <EventsProvider>
          <App />
        </EventsProvider>
      </DialogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
