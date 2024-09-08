import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DialogProvider } from "./context/DialogContext";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";
import initializeI18n from "./i18n";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <DialogProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </AuthProvider>
        </DialogProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

initializeI18n()
  .then(renderApp)
  .catch((error) => {
    console.error("Error initializing i18n:", error);
    renderApp();
  });
