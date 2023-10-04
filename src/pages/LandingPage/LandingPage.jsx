import "./LandingPage.css";
import Title from "./Title/Title";
import Explanation from "./Explanation/Explanation";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Examples from "./Examples/Examples";
import Inspiration from "./Inspiration/Inspiration";

function LandingPage() {
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Title />
      <Explanation />
      <Examples />
      <Inspiration />
    </>
  );
}

export default LandingPage;
