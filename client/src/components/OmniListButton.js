import React, { useState } from "react";

export default function OmniListButton({ index, name, clicks, currentlyHidden }) {

  const [clickCount, setClickCount] = useState(0);
  const [display, setDisplay] = useState("hidden");

  function clickFunction () {
    setClickCount(clickCount + 1);
    if (clickCount%2 == 0) {
        setDisplay("hidden");
    } else {
        setDisplay("container");
    }
    console.log(clickCount);
    console.log(display);
  }

  return (
    <button
      type="button"
      dataindex={index}  
      onClick={function() {
        clickFunction();
        console.log(clickCount)}}
         
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      {name}
    </button>
  );
}
