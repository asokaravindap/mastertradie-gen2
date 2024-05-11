import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";

import "@aws-amplify/ui-react/styles.css";
import AppRoutes from "./Components/AppRoutes/AppRoutes.tsx";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { appTheme } from "./Components/AppTheme/AppTheme.tsx";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>
);
