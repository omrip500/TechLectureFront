import "./ExampleCard.css";

const ExampleCard = ({ imgSrc, titleText, paragraphText }) => {
  return (
    <div className="exampleWithPhoto">
      <img src={imgSrc} alt="teacher" />
      <div className="example-text">
        <h1>{titleText}</h1>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
};

export default ExampleCard;
