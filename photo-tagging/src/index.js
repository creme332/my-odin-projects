import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";
import FireStoreManager from "./utils/FireStoreManager";
const root = ReactDOM.createRoot(document.getElementById("root"));
FireStoreManager();

root.render(<RouteSwitch />);
