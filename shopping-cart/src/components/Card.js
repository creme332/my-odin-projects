import CardCSS from "./../styles/Card.module.css";
import { Link } from "react-router-dom";

function Card({ title, price, imgSrc, imgAlt }) {
  const noTextDecorationStyle = { textDecoration: "none" };
  return (
    <Link style={{ textDecoration: "none" }} to={`/products/${title}`}>
      <div className={CardCSS.card}>
        <img src={imgSrc} alt={imgAlt ? imgAlt : "Image not found"} />
        <div className={CardCSS.cardDesc}>
          <span>{title}</span>
          <span className={`${CardCSS.price} ${noTextDecorationStyle}`}>
            Rs {parseInt(price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
