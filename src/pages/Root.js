import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavBar";
import "./Root.css";

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
        <footer className="footer">
          <p>&copy; 2023 TechLecture. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

export default RootLayout;
