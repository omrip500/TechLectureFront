import React from "react";
import "./Box.css"; // משתמש בקובץ ה-CSS שיצרת

const Box = ({ children }) => {
  return <div className="box">{children}</div>;
};

export default Box;
