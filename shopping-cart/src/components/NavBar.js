import { Link, useLocation } from "react-router-dom";
import NavCSS from "./../styles/NavBar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";

function NavBar() {
  const location = useLocation();
  const linkStyle = {
    textDecoration: "none",
  };
  const tabs = [
    { tabName: "Home", pathname: "/" },
    { tabName: "Products", pathname: "/products" },
    { tabName: "About", pathname: "/about" },
    { tabName: "Contact", pathname: "/contact" },
  ];
  return (
    <nav className={NavCSS.content}>
      <Link style={linkStyle} to="/">
        <div className={NavCSS.logo}>🍌 kram kram banane.</div>
      </Link>
      <ul className={NavCSS.ul}>
        {tabs.map((tab) => {
          return (
            <Link style={linkStyle} to={tab.pathname}>
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
        <li style={linkStyle} className={NavCSS.shoppingCart}>
          <span className={NavCSS.number}>1</span>
          <IconContext.Provider value={{ size: 30 }}>
            <AiOutlineShoppingCart />
          </IconContext.Provider>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
