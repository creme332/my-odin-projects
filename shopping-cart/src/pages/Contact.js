import ContactCSS from "./../styles/Contact.module.css";
import { motion } from "framer-motion";
import { Flex } from "@mantine/core";

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
        <Flex gap="md"
          direction={{ base: 'column', sm: 'row' }}
        >
          <Flex style={{ flex: 1 }} direction="column" wrap="wrap" gap="md">
            <label htmlFor="nameInput">Your name</label>
            <input
              placeholder="Enter your name here"
              id="nameInput"
              type="text"
            />
          </Flex>
          <Flex style={{ flex: 1 }} fullWidth direction="column" wrap="wrap" gap="md">
            <label htmlFor="emailInput">Your email</label>
            <input
              placeholder="Enter your email here"
              id="emailInput"
              type="email"
            />
          </Flex>
        </Flex>

        <Flex direction="column" wrap="wrap" gap="md">
          <label htmlFor="message">Message</label>
          <textarea
            placeholder="Let us know what you think"
            name=""
            id="message"
            minLength={100}
            cols="30"
            rows="10"
          ></textarea>
        </Flex>

        <button className="defaultButton" type="submit">
          Send
        </button>
      </form>
    </motion.div>
  );
}

export default Contact;
