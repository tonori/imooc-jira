import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "context";
import { BrowserRouter } from "react-router-dom";
import { loadServer, DevTools } from "jira-dev-tool";
import App from "./App";

import "./App.css";
import "antd/dist/antd.less";

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
