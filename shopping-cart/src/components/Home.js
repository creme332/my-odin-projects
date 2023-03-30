import HomeCSS from "./../styles/Home.module.css";
import photo from "./../assets/images/bana.jpg";
import { Link } from "react-router-dom";

function Home() {
  const linkStyle = {
    textDecoration: "none",
  };
  return (
    <div className={HomeCSS.home}>
      <div className={HomeCSS.main}>
        <h1>Healthy snacking made delicious🍌</h1>
        <p>
          Buy our banana chips made from 100% organic bananas. Choose from a
          wide variety of flavours including salty, caramel, smoke barbecue and
          many more.
        </p>
        <Link style={linkStyle} to="/products">
          <button className={HomeCSS.button}>Order</button>
        </Link>
      </div>
      <img src={photo} alt="Banana surrounded by ingredients" />{" "}
    </div>
  );
}

export default Home;
