// currently unused, but could be implemented inside the OmniList component
import React from "react";
import SubList from "./SubList"

function Card(props) {
  return (
    <div className="">
      <div className="">
        <h2>{props.heading}</h2>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;