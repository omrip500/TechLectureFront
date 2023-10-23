import React from "react";
import classes from "./Greeting.css";
const Greeting = (props) => {
  const handleLogout = () => {
    alert("התנתקת בהצלחה");
  };

  return (
    <div>
      <p className={classes.helloToUser}>שלום, {props.name}</p>
      <button className={classes.logOutButton} onClick={handleLogout}>
        התנתק
      </button>
    </div>
  );
};

export default Greeting;
