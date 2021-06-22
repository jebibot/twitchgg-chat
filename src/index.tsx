import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from "./App";
import "./index.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://ff81205a7c8e4fc3870f3895e9151ea4@o75632.ingest.sentry.io/5827569",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
