import "./Explanation.css";
import ExplanationExample from "./ExplanationExample";

const Explanation = () => {
  return (
    <section>
      <div className="explanation">
        <h1>How it works?</h1>
        <div className="examples">
          <ExplanationExample
            exampleType="create"
            titleText="Create"
            paragraphText={
              "Create a fun learning game in minutes – we call these 'TechLecture'." +
              "The format and number of questions is up to you.\n" +
              "Add videos, images and diagrams to your questions to amplify engagement."
            }
            imgSrc={require("../photos/create.png")}
          />

          <ExplanationExample
            exampleType="play"
            titleText="Play"
            paragraphText="TechLecture are best played in a group setting. To join a game,
                you need a unique PIN. If you’re the game host, you need a big screen.
                Players answer on their own devices, while questions are displayed on a
                shared screen. In addition to live games, you can also send TechLecture
                challenges that players complete at their own pace – for example, for
                homework or remote training."
            imgSrc={require("../photos/play.png")}
          />

          <ExplanationExample
            exampleType="share"
            titleText="Share"
            paragraphText="After a game, encourage players to create and share their own
                TechLecture With one of our premium plans for schools or
                business, you  can co-create games with your colleagues and save time on
                finding relevant TechLecture for your class or training session."
            imgSrc={require("../photos/share.png")}
          />
        </div>
      </div>
    </section>
  );
};

export default Explanation;
