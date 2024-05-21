import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ConfigProvider } from "antd";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={viVN}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
