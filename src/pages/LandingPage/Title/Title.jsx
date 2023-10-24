import { NavLink } from "react-router-dom";
import "./Title.css";
import { useIsAuthenticated } from "react-auth-kit";

const Title = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <section>
      <div class="external-container flex">
        <div class="internal-container flex">
          <div class="text">
            <h1>What is TechLecture?</h1>
            <p>
              TechLecture is a game-based learning platform that makes it easy
              <br />
              to create, share and play learning games or trivia quizzes in
              <br />
              minutes. Unleash the fun in classrooms, offices and living
              <br />
              rooms!
            </p>
            {!isAuthenticated() && (
              <button class="btn">
                <NavLink to="register">Sign Up for free</NavLink>
              </button>
            )}
          </div>
          <img src={require("../photos/classroom.webp")} alt="classroom" />
        </div>
      </div>
    </section>
  );
};

export default Title;
