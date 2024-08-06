import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import Messaging from "pages/miniComponents/Messaging"; // Import your Messaging component
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import "./index.css"; // Import your global CSS here
import JobsPage from "scenes/jobsPage/JobsPage";
import Home from "./pages/Home";
import Notifications from "pages/miniComponents/Notifications";
import Navbar from "scenes/navbar";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/profilehome" element={<Home />} />
            <Route
              path="/messaging"
              element={isAuth ? <Messaging /> : <Navigate to="/" />}
            />
            <Route
              path="/notification"
              element={isAuth ? <Notifications /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
