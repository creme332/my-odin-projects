import styles from "./../styles/Detail.module.css";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  return <div className={styles.detail}>{id}</div>;
}

export default Detail;
