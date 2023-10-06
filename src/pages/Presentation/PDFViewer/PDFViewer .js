import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import io from "socket.io-client";
import "./PDFViewer.css";
import { baseApi } from "../../../consts";

const PDFViewer = ({
  url,
  lectureTitle,
  lectureHours,
  lecturerName,
  viewType,
  fileNumber,
}) => {
  const [pdfData, setPdfData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const auth = useAuthUser();
  const socket = io.connect();

  useEffect(() => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPdfData(reader.result);
        };
        reader.readAsArrayBuffer(blob);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });

    // console.log(window.location.href.slice(47));

    if (viewType === "student") {
      socket.emit("joinRoom", { fileNumber });
      socket.emit("userConnected", {
        userConnected: auth().firstName + " " + auth().lastName + " ",
        room: fileNumber,
      });
    }
  }, [url]);

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSubmit = async (event) => {
    console.log("Im here");
    event.preventDefault();
    const formData = new FormData();
    formData.append("uploadedfile", uploadedFile);
    formData.append(
      "usersendFileName",
      auth().firstName + " " + auth().lastName
    );
    formData.append("presentationNumber", fileNumber);

    try {
      const response = await fetch(`${baseApi}/studentsUploads`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const studentFileNumber = data.studentFileNumber;
        console.log("Student file Number: " + studentFileNumber);

        socket.emit("joinRoom", { fileNumber });
        socket.emit("studentFileNumber", {
          fileNumber: studentFileNumber,
          userUploaded: auth().firstName + " " + auth().lastName + " ",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
    }
  };

  return (
    <>
      {viewType === "lecturer" && (
        <h1 className="lectureNumber">{"Lecture Number: " + fileNumber}</h1>
      )}
      <div className={`pdf-container ${viewType === "lecturer" ? "" : ""}`}>
        {viewType === "student" && (
          <h1 className="student-view-title">Student View</h1>
        )}
        <h1 className="lecture-title">{lectureTitle}</h1>
        <p className="lecture-hours">{lectureHours}</p>
        <p className="lecturer-name">{lecturerName}</p>
        {viewType === "student" && (
          <div className="student-view">
            <div className="student-upload">
              <input
                type="file"
                id="file-input"
                name="uploadedFile"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}
        <iframe
          src={`data:application/pdf;base64,${btoa(
            new Uint8Array(pdfData).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          )}`}
          width="100%"
          height={viewType === "student" ? "500px" : "1000px"}
          title="PDF Viewer"
        ></iframe>
        {viewType === "student" && (
          <button onClick={handleUploadButtonClick}>Upload File</button>
        )}
        <br />
        <br />
        <br />
        {uploadedFile && (
          <div className="uploaded-file">
            <form onSubmit={handleFileSubmit}>
              <p>Saved File: {uploadedFile.name}</p>
              <button type="submit">Submit File</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default PDFViewer;
