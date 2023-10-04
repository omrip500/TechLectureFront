import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-info">
          <h1>About Our Product</h1>
          <p>
            Welcome to our innovative product that will change the way you
            interact with education and technology.
          </p>
        </div>
        <div className="about-details">
          <h2>Features</h2>
          <ul>
            <li>Engaging Quizzes</li>
            <li>Interactive Learning</li>
            <li>Real-time Feedback</li>
            <li>Customizable Experience</li>
            <li>And More...</li>
          </ul>
          <p>
            Our mission is to provide a platform that empowers educators and
            learners to connect, collaborate, and succeed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
