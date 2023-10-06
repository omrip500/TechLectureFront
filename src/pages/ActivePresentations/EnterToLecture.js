import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./EnterToLecture.css";
import { baseApi } from "../../consts";

function EnterToLecture() {
  const [fileNumber, setFileNumber] = useState("");
  const [isFileNumberWrong, setIsFileNumberWrong] = useState(false);
  const navigate = useNavigate();

  const handleFileNumberChange = (e) => {
    setFileNumber(e.target.value);
  };

  const handleLogin = async () => {
    const response = await fetch(
      `${baseApi}/checkIfPresentationExists/${fileNumber}`
    );
    const data = await response.json();
    if (data.status === 200) {
      console.log("Data.status is 200!!");
      navigate(`/lectures/studentPosition/${fileNumber}`);
    } else {
      setFileNumber("");
      setIsFileNumberWrong(true);
    }
  };

  return (
    <div className="enter-to-lecture">
      {isFileNumberWrong && (
        <p className="wrongFileNumber">
          The Lecture number is wrong, please try again.
        </p>
      )}
      <h2>Login to Existing Lecture</h2>
      <form className="flex">
        <label>
          Lecture Number:
          <input
            type="text"
            value={fileNumber}
            onChange={handleFileNumberChange}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Enter The Lecture
        </button>
      </form>
    </div>
  );
}

export default EnterToLecture;
