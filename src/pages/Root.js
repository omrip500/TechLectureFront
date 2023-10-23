import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavBar/NavBar";
import "./Root.css";

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
