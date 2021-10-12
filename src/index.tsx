import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { loadServer, DevTools } from "jira-dev-tool";
import { store } from "store";
import App from "./App";

import "./App.css";
import "antd/dist/antd.less";

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <DevTools />
      <ReduxProvider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
