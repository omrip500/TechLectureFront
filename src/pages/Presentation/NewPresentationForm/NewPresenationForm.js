import React, { useState } from "react";
import "./NewPresenationForm.css";
import QRCodeGenerator from "../../../components/QR/QRCodeGenerator";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { baseApi } from "../../../consts";

function NewPresenationForm() {
  const auth = useAuthUser();
  const lecturerFullName = auth().firstName + " " + auth().lastName;
  const [lectureTopic, setLectureTopic] = useState("");
  const [lectureHours, setLectureHours] = useState("");
  const [lectureFile, setLectureFile] = useState(null);
  const [fileUploadSuccessfully, setFileUploadSuccessfully] = useState(false);
  const [lecturerPresenationAddress, setLecturerPresenationAddress] =
    useState("");
  const [studentPresentationAddress, setStudentPresentationAddress] =
    useState("");
  const [fileName, setFileName] = useState("");

  if (fileUploadSuccessfully) {
    // return <Navigate to={presenationAddress} replace={true} />;
  }

  const handleTopicChange = (event) => {
    setLectureTopic(event.target.value);
  };

  const handleHoursChange = (event) => {
    setLectureHours(event.target.value);
  };

  const handleFileChange = (event) => {
    setLectureFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("topic", lectureTopic);
    formData.append("hours", lectureHours);
    formData.append("file", lectureFile);
    formData.append("lecturerName", lecturerFullName);
    formData.append("lecturerEmail", auth().email);
    formData.append("date", new Date().toUTCString().slice(5, 16));

    try {
      const response = await fetch(`${baseApi}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setFileUploadSuccessfully(true);
        setLecturerPresenationAddress(
          `/lectures/lecturerPosition/${data.fileName}`
        );
        setStudentPresentationAddress(
          `/lectures/studentPosition/${data.fileName}/`
        );
        setFileName(data.fileName);
      } else {
        console.log("Upload failed");
      }
    } catch (error) {
      console.log(error);
    }

    setLectureTopic("");
    setLectureHours("");
    setLectureFile(null);
  };

  return (
    <>
      {!fileUploadSuccessfully && (
        <div className="lecture-form">
          <h2>Start Your Lecture</h2>
          <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-section">
              <label htmlFor="lectureTopic">Lecture Topic:</label>
              <input
                type="text"
                id="lectureTopic"
                name="lectureTopic"
                value={lectureTopic}
                onChange={handleTopicChange}
                required
              />
            </div>

            <div className="form-section">
              <label htmlFor="lectureHours">
                Lecture Hours (e.g., 09:00 - 10:30):
              </label>
              <input
                type="text"
                id="lectureHours"
                name="lectureHours"
                value={lectureHours}
                onChange={handleHoursChange}
                required
              />
            </div>

            <div className="form-section">
              <label htmlFor="lectureFile">Upload Lecture File:</label>
              <input
                type="file"
                id="lectureFile"
                name="lectureFile"
                accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-section">
              <button type="submit">Submit Lecture</button>
            </div>
          </form>
        </div>
      )}
      {fileUploadSuccessfully && (
        <div className="lectureDetails flex">
          <QRCodeGenerator url={`${studentPresentationAddress}`} />
          <h3>{"Presentation Code: " + fileName}</h3>
          <Link to={lecturerPresenationAddress}>Move to Lecturer Position</Link>
        </div>
      )}
    </>
  );
}

export default NewPresenationForm;
