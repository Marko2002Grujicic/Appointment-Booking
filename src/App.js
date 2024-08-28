import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Settings from "./pages/settings/Settings";
import SidebarComponent from "./pages/global/sidebar/SidebarComponent";
import Navbar from "./pages/global/nabar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Help from "./pages/help/Help";
import BookAppointmentDialog from "./components/book-appointment-dialog/BookAppointmentDialog";
import RegistrationForm from "./pages/forms/registration-form/RegistrationForm";
import LoginForm from "./pages/forms/login-form/LoginForm";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarComponent />
          <main className="content">
            <Navbar />
            <BookAppointmentDialog />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="/registration" element={<RegistrationForm />} />
              <Route path="*" element={<LoginForm />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
