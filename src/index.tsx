import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "context";
import { BrowserRouter } from "react-router-dom";
import { loadDevTools } from "jira-dev-tool";
import App from "./App";

import "./App.css";
import "antd/dist/antd.less";

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <BrowserRouter basename="imooc-jira">
          <App />
        </BrowserRouter>
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
