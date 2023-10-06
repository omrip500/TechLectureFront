import React from "react";
import "./KahootStyle.css";

const KahootLikeSite = () => {
  return (
    <div className="kahoot-container flex">
      <header className="kahoot-header">
        <h1>Kahoot.it</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Create</a>
        </nav>
      </header>
      <main className="kahoot-main">
        <h2>Welcome to Kahoot!</h2>
        <p>Join a game or create your own. Have fun learning!</p>
        <a href="#" className="play-button">
          Play Now
        </a>
      </main>
      <footer className="kahoot-footer">
        <p>&copy; 2023 Kahoot.it. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default KahootLikeSite;
