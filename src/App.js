import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Settings from "./pages/settings/Settings";
import SidebarComponent from "./pages/global/sidebar/Sidebar";
import Navbar from "./pages/global/nabar/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Help from "./pages/help/Help";
import BookAppointmentDialog from "./components/book-appointment-dialog/BookAppointmentDialog";

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
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
