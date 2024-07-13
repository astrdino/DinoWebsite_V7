import React from "react";
import "../components_style.css";

const Buttons_ClosePage = ({ child2Parent }) => {
  const handleClick = () => {
    console.log("shit");
    child2Parent(false); //Send signal "close the page" to parent slide-in page
  };
  return (
    <div className="Buttons_ClosePage_Container">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
      >
        <line
          x1="10"
          y1="10"
          x2="90"
          y2="90"
          stroke="black"
          stroke-width="8"
          stroke-linecap="butt"
        />
        <line x1="90" y1="10" x2="10" y2="90" stroke="black" stroke-width="8" />
      </svg>
    </div>
  );
};

export { Buttons_ClosePage };
