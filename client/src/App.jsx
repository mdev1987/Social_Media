import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage'
import ProfilePage from "./pages/ProfilePage";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector(state => state.token));
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>            
            <Route path="/" element={isAuth ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
