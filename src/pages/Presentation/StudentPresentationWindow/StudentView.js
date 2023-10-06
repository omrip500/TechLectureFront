import React, { useState, useEffect } from "react";
import "./StudentView.css"; // עיצוב בעזרת CSS
import { baseApi } from "../../../consts";

const StudentView = (props) => {
  const fileNumber = props.fileNumber;
  const [fileUrl, setFileUrl] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureHours, setLectureHours] = useState("");
  const [lecturerName, setLecturerName] = useState("");

  useEffect(async () => {
    const response = await fetch(`${baseApi}/upload/${fileNumber}`);

    if (response.ok) {
      const data = await response.json();
      setFileUrl(`${baseApi}${fileNumber}.${data.fileType}`);
      setLectureTitle(data.lectureTopic);
      setLectureHours(data.hours);
      setLecturerName(data.lecturerName);
    }
  }, [fileNumber]);
};

export default StudentView;
