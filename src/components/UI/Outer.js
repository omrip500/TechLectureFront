import React from "react";
import "./Outer.css";

function Outer(props) {
  return <div className={props.backgroundColor}>{props.children}</div>;
}

export default Outer;
