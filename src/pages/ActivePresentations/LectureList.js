import { useEffect, useState } from "react";
import classes from "./LectureList.module.css";
import { useAuthUser } from "react-auth-kit";
import { Navigate, Link } from "react-router-dom";

const LectureList = () => {
  const auth = useAuthUser();
  const userEmail = auth().email;
  const [userActivePresentations, setUserActivePresentations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserActivePresentations = async () => {
      const response = await fetch(
        // "http://localhost:8080/userActivePresentations/" + userEmail
        "/userActivePresentations/" + userEmail
      );
      const data = await response.json();
      if (data.status === 200) {
        setUserActivePresentations(data.presentations);
      }
      setLoading(false);
    };
    getUserActivePresentations();
  }, [userEmail]);

  const handleDeletePresentation = async (presentationID) => {
    const response = await fetch(
      // "http://localhost:8080/deleteUserActivePresentation/",
      "/deleteUserActivePresentation/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ presentationID: presentationID }),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setUserActivePresentations(
        userActivePresentations.filter(
          (presentation) => presentation._id !== presentationID
        )
      );
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className={classes["lecture-list-container"]}>
      <h2 className={classes["lecture-list-title"]}>
        Your Active Lectures List
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : userActivePresentations.length === 0 ? (
        <p className={classes[".no-presentations-message"]}>
          You have no active lectures.
        </p>
      ) : (
        <ul className={classes["lecture-list"]}>
          {userActivePresentations.map((presentation, index) => (
            <li key={index} className={classes["lecture-item"]}>
              <div className={classes["lecture-info"]}>
                <p className={classes["serial-number"]}>
                  Lecture Number: {index + 1}
                </p>
                <p className={classes["lecture-name"]}>
                  Topic: {presentation.lectureTopic}
                </p>
                <p className={classes["lecture-date"]}>
                  Date: {presentation.date}
                </p>
              </div>
              <div className={classes["lectures-actions"]}>
                <Link
                  to={`/lectures/lecturerPosition/${presentation.fileNumber}`}
                  className={classes["lecture-link"]}
                >
                  Link To Lecture
                </Link>
                <button
                  onClick={() => handleDeletePresentation(presentation._id)}
                  className={classes["delete-button"]}
                >
                  Delete Lecture
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LectureList;
