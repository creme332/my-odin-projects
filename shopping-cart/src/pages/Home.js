import HomeCSS from "./../styles/Home.module.css";
import photo from "./../assets/images/banana-chips.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const linkStyle = {
    textDecoration: "none",
  };
  return (
    <motion.div
      className={HomeCSS.home}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={HomeCSS.main}>
        <h1 className="defaultH1">Healthy snacking made delicious🍌</h1>
        <p>
          Buy our banana chips made from 100% organic bananas. Choose from a
          wide variety of flavours including salty, caramel, smoky barbecue and
          many more.
        </p>
        <Link style={linkStyle} to="/products">
          <button className="defaultButton">Order</button>
        </Link>
      </div>
      <img src={photo} alt="Banana surrounded by ingredients" />{" "}
    </motion.div>
  );
}

export default Home;
