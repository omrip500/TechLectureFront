import React from "react";
import { Link } from "react-router-dom";
import classes from "./AfterSignUp.module.css";
const ignUp = () => {
  return (
    <div className={classes["registration-container"]}>
      <div className={classes["registration-content"]}>
        <div className={classes["registration-description"]}>
          <h1>Thank You for Joining TechLecture!</h1>
          <p>
            Welcome to our community! You have successfully registered with
            TechLecture. Start connecting with others, learning, and sharing
            knowledge.
          </p>
          <p>
            You can now{" "}
            <a className={classes["login-link"]} href="login">
              login
            </a>{" "}
            to your TechLecture account and start enjoying our community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ignUp;
