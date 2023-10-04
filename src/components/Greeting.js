import React from "react";
import classes from "./Greeting.css"; // השלמת היכולת לעצב את הקומפוננטה

const Greeting = (props) => {
  const handleLogout = () => {
    // פונקציה זו תבצע את התנתקות המשתמש
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
