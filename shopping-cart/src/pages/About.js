import AboutCSS from "./../styles/About.module.css";
import { motion } from "framer-motion";
function About() {
  return (
    <motion.div
      className={AboutCSS.about}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {" "}
      <div className={AboutCSS.b}></div>
      <div className={AboutCSS.c}>About us</div>
      <div className={AboutCSS.d}>
        <p>
          At Kram Kram Banane, we believe that food should not only be
          delicious, but also sustainable and locally-sourced. Our vision is to
          provide customers with a unique snacking experience that is both
          satisfying and guilt-free. We source our organic bananas from local
          farmers, fry them with an airfryer for a healthier snack, and even
          turn the banana peels into compost for sustainable agriculture.
        </p>
        <p>
          We aim to be a socially responsible company that supports our
          community and environment. Through our business, we hope to promote
          sustainable agriculture practices and contribute to the local economy
          by creating job opportunities. Our ultimate goal is to become a
          leading producer of high-quality banana chips that prioritize taste,
          health, and sustainability.
        </p>
      </div>
      <div className={AboutCSS.f}></div>
    </motion.div>
  );
}

export default About;
