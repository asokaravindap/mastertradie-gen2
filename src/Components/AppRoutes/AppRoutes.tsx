import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

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
