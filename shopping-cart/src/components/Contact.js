import ContactCSS from "./../styles/Contact.module.css";

function Contact() {
  return (
    <div className={ContactCSS.contact}>
      <h1>Contact Us🍌</h1>
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

        <button type="submit">Contact Us</button>
      </form>
    </div>
  );
}

export default Contact;
