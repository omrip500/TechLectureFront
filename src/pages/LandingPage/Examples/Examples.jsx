import "./Examples.css";
import ExampleCard from "./ExampleCard";

const Examples = () => {
  return (
    <section className="exmples">
      <h1>Played around the world in classrooms, offices and living rooms</h1>
      <div className="three-examples flex">
        <ExampleCard
          imgSrc={require("../photos/teacher.png")}
          titleText="By teachers and students"
          paragraphText={`Millions of teachers and students unleash the 
              magic of learning with TechLecture Introduce new 
              topics, review, reward, and collect data for 
              formative assessment.`}
        />
        <ExampleCard
          imgSrc={require("../photos/office.png")}
          titleText="By office superheroes"
          paragraphText=" Make learning awesome in a business setting, too! 
              Companies of all sizes use TechLecture in training,
              presentations, team building and events."
        />
        <ExampleCard
          imgSrc={require("../photos/families.png")}
          titleText="By families and friends"
          paragraphText="Birthdays, weddings, holidays, game nights, 
              family dinners, trivia TechLecture is the secret 
              ingredient that will make any party or gathering 
              even more awesome."
        />
      </div>
    </section>
  );
};

export default Examples;
