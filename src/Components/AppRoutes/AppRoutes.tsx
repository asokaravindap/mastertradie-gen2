import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider as AmplifyThemeProvider } from "@aws-amplify/ui-react";
import { appTheme } from "../../Components/AppTheme/AppTheme.tsx";
import CustomerTable from "../Dashboard/CustomerTable/CustomerTable.tsx";
import NewCustomer from "../Dashboard/NewCustomer/NewCustomer.tsx";
import NewTag from "../Dashboard/NewTag/NewTag.tsx";
import TagBoard from "../Dashboard/TagBoard/TagBoard.tsx";

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
          path="/dashboard/*"
          element={
            <Authenticator>
              <Dashboard />
            </Authenticator>
          }
        >
          <Route path="customerview" element={<CustomerTable />} />
          <Route path="customeradd" element={<NewCustomer />} />
          <Route path="tagview" element={<TagBoard />} />
          <Route path="tagadd" element={<NewTag />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
