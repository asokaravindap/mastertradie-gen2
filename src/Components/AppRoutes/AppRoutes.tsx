import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider as AmplifyThemeProvider } from "@aws-amplify/ui-react";
import { appTheme } from "../../Components/AppTheme/AppTheme.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AmplifyThemeProvider theme={appTheme}>
              <LandingPage />
            </AmplifyThemeProvider>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Authenticator>
              <Dashboard />
            </Authenticator>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
