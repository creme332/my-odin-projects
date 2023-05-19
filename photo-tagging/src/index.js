import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
initializeApp(getFirebaseConfig());

root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
