import "./InspirationCard.css";

const InspirationCard = ({
  mainImg,
  avatarImg,
  personName,
  date,
  titleText,
  paragraphText,
}) => {
  return (
    <div className="inspiration-card">
      <img src={mainImg} />
      <div className="details">
        <img src={avatarImg} alt="avatar" />
        <p>
          <br />
          {personName} <br />
          <br />
          <br />
          {date}
        </p>
      </div>
      <div className="content">
        <h3>{titleText}</h3>
        <p>{paragraphText}</p>
      </div>
    </div>
  );
};

export default InspirationCard;
