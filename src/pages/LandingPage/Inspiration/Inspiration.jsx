import "./Inspiration.css";
import InspirationCard from "./InspirationCars";

const Inspiration = () => {
  return (
    <section class="inspiration">
      <h1>Inspiring stories from TechLecture heroes</h1>
      <div class="inspiration-cards">
        <InspirationCard
          mainImg={require("../photos/inspiration1.jpg")}
          avatarImg={require("../photos/ladyavatar.png")}
          personName="Isabella Vick"
          date="June 5, 2019"
          titleText="It's taken over the school by storm!: teachers at Bishop O'Dowd Hig..."
          paragraphText="Science, math, arts, drama - teachers at Bishop 
              O’Dowd High School have integrated TechLecture 
              into all classes! Now, with TechLecture Pro, they can 
              easily..."
        />

        <InspirationCard
          mainImg={require("../photos/inspiration-facebook.jpg")}
          avatarImg={require("../photos/avatar2.png")}
          personName="Omri Harel"
          date="May 8, 2023"
          titleText="Facebook success story: How 
              TechLecture fulfills the dream of any 
              trainer"
          paragraphText="In a video interview, Leo Silva, sales training 
              partner at Facebook LATAM, shares how TechLecture 
              quickly won over both trainers and trainees with 
              its..."
        />

        <InspirationCard
          mainImg={require("../photos/inspiration3.jpg")}
          avatarImg={require("../photos/avatar3.jpeg")}
          personName="Ros Geller"
          date="September 25, 2023"
          titleText="Onboarding across 170 hospitals: 
              TechLecture integrated into the 
              learning..."
          paragraphText="Overseeing training for 170 hospitals in North 
              America, Todd Grantham champions TechLecture’ing 
              in Children’s Miracle Network Hospitals! Read 
              about their unique approach to onboarding..."
        />

        <InspirationCard
          mainImg={require("../photos/inspiration4.jpg")}
          avatarImg={require("../photos/avatar4.jpg")}
          personName="Phoebe Bouffe"
          date="December 17, 2022"
          titleText="Activate, review, engage, reward: 
              rethinking learning with TechLecture"
          paragraphText="How will we inspire and educate young minds in 
              the future? Passionate and dedicated English 
              teacher Laura Steinbrink has cool new ways to rethink..."
        />

        <InspirationCard
          mainImg={require("../photos/inspiration5.png")}
          avatarImg={require("../photos/avatar5.jpg")}
          personName="Rachel Green"
          date="November 6, 2021"
          titleText="From lectures to game-based
              classes and 100% course pass rate"
          paragraphText=" University teacher Niki Bray redesigned an Intro 
              to Kinesiology course with TechLecture and 
              increased course pass rate from 57% to 100% in a 
              matter..."
        />

        <InspirationCard
          mainImg={require("../photos/inspiration6.jpg")}
          avatarImg={require("../photos/avatar6.jpg")}
          personName="Joey Tribbiani"
          date="July 12, 2021"
          titleText=" Fairtrade: mastering policies 
              through play and teamwork"
          paragraphText="Let’s face it - mastering policies isn’t easy. But
              who said it has to be unengaging? Read how
              Fairtrade reimagined this type of training..."
        />
      </div>
    </section>
  );
};

export default Inspiration;
