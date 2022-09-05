import React from "react";
import "../styles/SuccessfullyAdded.css";

export default function SuccessfullyAdded() {
  return (
    <div>
      {window.innerWidth > 800 && (
        <div class="success-page">
          <img class="success-icon" src={require("../images/Frame.png")} />

          <h1 class="success-text">ჩანაწერი დამატებულია!</h1>

          <button class="success-list-button" type="button">
            სიაში გადაყვანა
          </button>
          <button class="success-main-button" type="button">
            მთავარი
          </button>
        </div>
      )}

      {window.innerWidth <= 800 && (
        <div class="success-page">
          <img class="success-icon" src={require("../images/Frame.png")} />

          <h1 class="success-text">ჩანაწერი დამატებულია!</h1>

          <button class="success-list-button" type="button">
            სიაში გადაყვანა
          </button>
          <button class="success-main-button" type="button">
            მთავარი
          </button>
        </div>
      )}
    </div>
  );
}
