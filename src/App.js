import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ColorModeContext, useMode } from "./theme";

import { useAuth } from "./context/AuthProvider";

import SidebarComponent from "./pages/global/sidebar/SidebarComponent";
import Navbar from "./pages/global/nabar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import LoginForm from "./pages/login-and-registration/login-form/LoginForm";
import RegistrationForm from "./pages/login-and-registration/registration-form/RegistrationForm";
import ToastifyContainer from "./pages/global/toastify/ToastifyContainer";
import AppointmentDialog from "./components/appointment-dialog/AppointmentDialog";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, colorMode] = useMode();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) return;
    toast.info(t("toast.updateAvailability"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <SidebarComponent />}
          <main className="content">
            <Navbar />
            <AppointmentDialog />
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route
                path="/"
                element={<ProtectedRoute element={Dashboard} />}
              />
              <Route
                path="/settings"
                element={<ProtectedRoute element={Settings} />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            <ToastifyContainer theme={theme.palette.mode} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
