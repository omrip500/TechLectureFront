import "./LandingPage.css";
import Title from "./Title/Title";
import Explanation from "./Explanation/Explanation";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Examples from "./Examples/Examples";
import Inspiration from "./Inspiration/Inspiration";
import NotSupportMobilePage from "../NotSupportsMobile/NotSupportMobilePage";

function LandingPage() {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="landingPage">
      <Title />
      <Explanation />
      <Examples />
      <Inspiration />
      <NotSupportMobilePage />
    </div>
  );
}

export default LandingPage;
