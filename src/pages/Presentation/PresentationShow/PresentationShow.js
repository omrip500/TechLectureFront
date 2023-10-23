import { useState, useEffect } from "react";
import PDFViewer from "../PDFViewer/PDFViewer ";
import { useParams } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import io from "socket.io-client";

import "./PresentationShow.css";
import NewUserPopUp from "../../../components/NewUserPopUp/NewUserPopUp";
import NewFilePopUp from "../../../components/NewFilePopUp/NewFilePopUp";
import address from "../../../address";

const PresentationShow = (props) => {
  const [fileFounded, setFiledFounded] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureHours, setLectureHours] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [userFileUrl, setUserFileUrl] = useState("");
  const [thereIsANewFile, setThereIsANewFile] = useState(false);
  const [userFullName, setUserFulleName] = useState("");
  const [hasPermission, setHasPermission] = useState(true); // תיקנתי שגיאת כתיב
  const [studentsUploadButtonText, setStudentsUploadButtonText] = useState(
    "File upload is not enabled"
  );
  const [studentsCanUploadFiles, setStudentsCanUploadFiles] = useState(false);
  const socket = io.connect(address);

  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const fileNumber = useParams().fileNumber;

  const [newUsers, setNewUsers] = useState([]); // תופסת למעקב אחרי המשתמשים החדשים שמתחברים

  const clickHandle = () => {
    setStudentsCanUploadFiles(!studentsCanUploadFiles);
  };

  useEffect(() => {
    if (studentsCanUploadFiles === false) {
      setStudentsUploadButtonText("File upload is not enabled");
    } else {
      setStudentsUploadButtonText("File upload is enabled");
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          // "http://localhost:8080/upload/" + fileNumber
          `${address}/upload/${fileNumber}`
        );

        const data = await response.json();
        if (data.status === 400) {
          console.error("Failed to fetch data");
          setFiledFounded(false);
        } else {
          if (data.lecturerEmail !== auth().email) {
            setHasPermission(false);
          }
          const presentationFileUrl = `${address}/uploads/${fileNumber}.${data.fileType}`;
          setFileUrl(presentationFileUrl);
          setLectureTitle(data.lectureTopic);
          setLectureHours(data.hours);
          setLecturerName(data.lecturerName);
          setFiledFounded(true);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [
    fileNumber,
    fileUrl,
    studentsCanUploadFiles,
    auth,
    newUsers,
    props.viewType,
  ]);

  useEffect(() => {
    if (props.viewType === "lecturer") {
      console.log("hi Im here");
      socket.emit("joinRoom", { room: fileNumber });
      socket.on("receiveMessage", (message) => {
        console.log("from data: " + message);
        console.log("from client: " + fileNumber);

        setNewUsers((prevUsers) => [...prevUsers, message]);
        console.log(newUsers);
      });
    }
  }, [socket]);

  useEffect(() => {
    const getStudentFile = async () => {
      setThereIsANewFile(false);
      if (props.viewType === "lecturer") {
        socket.emit("joinRoom", { fileNumber });
        socket.on("userFileNumber", ({ fileNumber, userUploaded }) => {
          setUserFileUrl(`/studentsUploads/${fileNumber}`);
          setThereIsANewFile(true);
          setUserFulleName(userUploaded);

          if (studentsCanUploadFiles) {
            window.scrollTo(0, 0);
          }
        });
      }
    };
    const intervalId = setInterval(getStudentFile, 4000);
    return () => clearInterval(intervalId);
  }, [userFileUrl, props.viewType]);

  useEffect(() => {
    socket.emit("joinRoom", { room: fileNumber });
    socket.emit("areStudentsPremittedToUploadFiles", {
      studentsCanUploadFiles: studentsCanUploadFiles,
    });
  }, [studentsCanUploadFiles]);

  if (!fileUrl && fileFounded) {
    return <h1>Loading...</h1>;
  }

  if (props.viewType === "lecturer" && (!hasPermission || !isAuthenticated())) {
    return <h1>You haven't permission to access this page.</h1>;
  }

  if (fileFounded) {
    return (
      <div>
        {newUsers.map((user) => (
          <NewUserPopUp message={user + " joined"} />
        ))}

        {props.viewType === "lecturer" && (
          <div className="centered-button">
            <button
              className="allowUploadingFiles"
              onClick={clickHandle}
              value={studentsUploadButtonText}
            >
              {studentsUploadButtonText}
            </button>
            <br />
            <br />
          </div>
        )}
        {thereIsANewFile && studentsCanUploadFiles && (
          <NewFilePopUp userFullName={userFullName} userFileUrl={userFileUrl} />
        )}
        <PDFViewer
          url={fileUrl}
          lectureTitle={lectureTitle}
          lectureHours={lectureHours}
          lecturerName={lecturerName}
          fileNumber={fileNumber}
          viewType={props.viewType}
        />
      </div>
    );
  } else {
    return (
      <h1 className="fileNotFoundMessage">
        Failed to find the requested file.
      </h1>
    );
  }
};

export default PresentationShow;
