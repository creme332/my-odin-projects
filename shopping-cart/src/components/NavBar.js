import { Link, useLocation } from "react-router-dom";
import NavCSS from "./../styles/NavBar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import uniqid from "uniqid";
import { Example } from "./Example";

function NavBar() {
  const location = useLocation();
  const linkStyle = {
    textDecoration: "none",
  };
  const tabs = [
    { tabName: "Home", pathname: "/", id: uniqid() },
    { tabName: "Products", pathname: "/products", id: uniqid() },
    { tabName: "About", pathname: "/about", id: uniqid() },
    { tabName: "Contact", pathname: "/contact", id: uniqid() },
  ];
  return (
    <nav className={NavCSS.content}>
      <Link style={linkStyle} to="/">
        <div className={NavCSS.logo}>🍌 kram kram banane.</div>
      </Link>
      <ul className={NavCSS.tabs}>
        {tabs.map((tab) => {
          return (
            <Link key={tab.id} style={linkStyle} to={tab.pathname}>
              <li>
                {tab.tabName}
                {location.pathname === tab.pathname ? (
                  <motion.div
                    className={NavCSS.underline}
                    layoutId="underline"
                  />
                ) : null}
              </li>
            </Link>
          );
        })}

        {/* <li key={uniqid()} style={linkStyle} className={NavCSS.shoppingCart}>
          <span className={NavCSS.number}>1</span>
          <IconContext.Provider value={{ size: 30 }}>
            <AiOutlineShoppingCart />
          </IconContext.Provider>
        </li> */}
        <Example />
      </ul>
    </nav>
  );
}

export default NavBar;
