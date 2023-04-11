import styles from "./../styles/Detail.module.css";
import { useLocation } from "react-router-dom";
function Detail({ clickHandler }) {
  const cardInfo = useLocation().state;

  console.log(cardInfo);

  return (
    <div className={styles.detail}>
      <h1 className="defaultH1">{cardInfo.title}</h1>
      <p>{cardInfo.description}</p>
    </div>
  );
}

export default Detail;
