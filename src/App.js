import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegistrationForm from "./pages/Authentication/Register/RegistrationForm";
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./pages/Authentication/Login/LoginForm";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import { useSignOut, RequireAuth } from "react-auth-kit";
import AfterSignUp from "./pages/AfterSigningUp/AfterSignUp";
import NewPresentationForm from "./pages/Presentation/NewPresentationForm/NewPresenationForm";
import PresentationShow from "./pages/Presentation/PresentationShow/PresentationShow";
import LectureList from "./pages/ActivePresentations/LectureList";
import EnterToLecture from "./pages/ActivePresentations/EnterToLecture";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function App() {
  const signOut = useSignOut();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { fileNumber } = useParams();

  useEffect(() => {
    const lastFile = getLastStudentsUpload();
  }, []);

  const getLastStudentsUpload = async () =>
    await fetch(
      // "http://localhost:8080/upload/" + fileNumber
      "/getLastStudentsUpload"
    );

  const signOutTechLecture = () => {
    document.body.classList.add("signing-out");

    setTimeout(() => {
      try {
        setIsSigningOut(true);
        signOut();
        window.location.replace("/");
      } catch (err) {
        console.error("Error during sign out:", err);
        window.location.replace("/");
      }
    }, 0);
    return null;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        { path: "register", element: <RegistrationForm /> },
        { path: "login", element: <LoginPage /> },
        {
          path: "loginToAcessContent/",
          element: <LoginPage toLecture="true" />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        { path: "about", element: <AboutPage /> },
        {
          path: "signOut",
          loader: () => signOutTechLecture(),
        },
        { path: "signedUpSuccsessfully", element: <AfterSignUp /> },

        {
          path: "presentation",
          element: (
            <RequireAuth loginPath="login">
              <NewPresentationForm />
            </RequireAuth>
          ),
        },

        {
          path: "activePresentations",
          element: <LectureList />,
        },

        {
          path: "joinALecture",
          element: (
            <RequireAuth loginPath={`/loginToAcessContent`}>
              <EnterToLecture />{" "}
            </RequireAuth>
          ),
        },

        {
          path: "lectures/lecturerPosition/:fileNumber",
          element: <PresentationShow viewType="lecturer" />,
        },

        {
          path: "lectures/studentPosition/:fileNumber",
          element: (
            <RequireAuth loginPath={`/loginToAcessContent`}>
              <PresentationShow viewType="student" />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      {isSigningOut && (
        <div className="loading-screen">
          <span className="loading-text">Signing out...</span>
        </div>
      )}
      <RouterProvider router={router} />{" "}
    </>
  );
}

export default App;
