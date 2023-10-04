import React, { useState, useEffect } from "react";
import "./NewFilePopUp.css";

const NewFilePopUp = ({ userFullName, userFileUrl }) => {
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    // אם קיבלנו קריאה חדשה, הצג את האנימציה
    setShowFlash(true);

    // לאחר זמן קצר, הסתר את האנימציה
    const timeout = setTimeout(() => {
      setShowFlash(false);
    }, 2000);

    // בכל פעם שהקומפוננטה מאושרת מחדש, ננקה את ה-timeout
    return () => clearTimeout(timeout);
  }, [userFullName, userFileUrl]);

  return (
    <div className={`window-container ${showFlash ? "flash" : ""}`}>
      <div className="image-preview">
        <div className="overlay">
          <p>
            {`Your student: ${userFullName} uploaded a new file.`}
            <br />
            <a target="_blank" href={userFileUrl}>
              Open It
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewFilePopUp;
