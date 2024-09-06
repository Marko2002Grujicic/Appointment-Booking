import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Settings from "./pages/settings/Settings";

import { useAuth } from "./context/AuthProvider";

import SidebarComponent from "./pages/global/sidebar/SidebarComponent";
import Navbar from "./pages/global/nabar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Info from "./pages/info/Info";
import BookAppointmentDialog from "./components/book-appointment-dialog/BookAppointmentDialog";
import RegistrationForm from "./pages/forms/registration-form/RegistrationForm";
import LoginForm from "./pages/forms/login-form/LoginForm";
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
            <BookAppointmentDialog />
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
              <Route path="/info" element={<ProtectedRoute element={Info} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
