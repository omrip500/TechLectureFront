import React, { useEffect, useState } from "react";
import "./NewUserPopUp.css";

const NewUserPopUp = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`new-user-popup ${isVisible ? "show" : ""}`}>{message}</div>
  );
};

export default NewUserPopUp;
