import ContactCSS from "./../styles/Contact.module.css";
import { motion } from "framer-motion";
function Contact() {
  return (
    <motion.div
      className={ContactCSS.contact}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <h1 className="defaultH1">Contact Us🍌</h1>
      <form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={ContactCSS.group}>
            <label htmlFor="nameInput">Your name</label>
            <input
              placeholder="Enter your name here"
              id="nameInput"
              type="text"
            />
          </div>
          <div className={ContactCSS.group}>
            <label htmlFor="emailInput">Your email</label>
            <input
              placeholder="Enter your email here"
              id="emailInput"
              type="email"
            />
          </div>
        </div>

        <div className={ContactCSS.group}>
          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Let us know what you think"
            name=""
            id="message"
            minLength={100}
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <button className="defaultButton" type="submit">
          Send
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
