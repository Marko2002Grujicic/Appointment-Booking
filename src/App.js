import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import { useAuth } from "./context/AuthProvider";

import SidebarComponent from "./pages/global/sidebar/SidebarComponent";
import Navbar from "./pages/global/nabar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import LoginForm from "./pages/login-and-registration/login-form/LoginForm";
import RegistrationForm from "./pages/login-and-registration/registration-form/RegistrationForm";
import AppointmentDialog from "./components/appointment-dialog/AppointmentDialog";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  const { isAuthenticated } = useAuth();

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
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
