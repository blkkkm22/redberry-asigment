import React from "react";
import AddNewLaptop from "./AddNewLaptop";
import "../styles/Main.css";

export default function Main() {
  const [componentPage, setComponentPage] = React.useState(false);

  React.useEffect(() => {
    /*   if (localStorage.getItem("form") != null) {
      setFormData(JSON.parse(localStorage.getItem("form")));
    }
      */

    if (localStorage.getItem("addPage") != null) {
      setComponentPage(localStorage.getItem("addPage"));
    }
  }, []);

  function addLaptopPage() {
    setComponentPage(true);
  }

  return (
    <div>
      {!componentPage && (
        <div class="main-page">
          <img
            class="main-redberry-icon"
            src={require("../images/LOGO-02 1.png")}
          />

          <img class="main-image" />

          <button class="main-button" type="button" onClick={addLaptopPage}>
            ჩანაწერის დამატება
          </button>

          <button class="main-button" type="button">
            ჩანაწერების სია
          </button>
        </div>
      )}
      {componentPage && <AddNewLaptop />}
    </div>
  );
}
