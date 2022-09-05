import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./components/Main";
import "../src/script/HelveticaNeue.ttc";
// import SuccessfullyAdded from "./components/SuccessfullyAdded";
// import AddNewLaptop from "./components/AddNewLaptop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
