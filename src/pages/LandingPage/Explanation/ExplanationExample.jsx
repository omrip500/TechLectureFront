import "./ExplanationExample.css";

const ExplanationExample = ({
  exampleType,
  titleText,
  paragraphText,
  imgSrc,
}) => {
  return (
    <div className={`example ${exampleType} flex`}>
      <div className={`examples-text ${exampleType}-text`}>
        <h2>{titleText}</h2>
        <p>{paragraphText}</p>
      </div>
      <img src={imgSrc} />
    </div>
  );
};

export default ExplanationExample;
