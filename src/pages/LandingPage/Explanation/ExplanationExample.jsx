import "./ExplanationExample.css";

const ExplanationExample = ({
  exampleType,
  titleText,
  paragraphText,
  imgSrc,
}) => {
  return (
    <div className={`example ${exampleType}`}>
      <div className={`examples-text ${exampleType}-text`}>
        <h1>{titleText}</h1>
        <p>{paragraphText}</p>
      </div>
      <img src={imgSrc} />
    </div>
  );
};

export default ExplanationExample;
