// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./reduxStore";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<></>}>
        <Provider store={store}>
          <App />
        </Provider>
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
