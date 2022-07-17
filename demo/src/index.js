import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale-provider/zh_CN";

import App from "./containers/App";
import "./index.less";
import reportWebVitals from "./reportWebVitals";

// https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
