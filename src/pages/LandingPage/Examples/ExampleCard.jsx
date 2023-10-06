import "./ExampleCard.css";

const ExampleCard = ({ imgSrc, titleText, paragraphText }) => {
  return (
    <div className="exampleWithPhoto flex">
      <img src={imgSrc} />
      <div className="example-text">
        <h1>{titleText}</h1>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
};

export default ExampleCard;
