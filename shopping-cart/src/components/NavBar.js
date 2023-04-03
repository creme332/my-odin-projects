import { Link, useLocation } from "react-router-dom";
import NavCSS from "./../styles/NavBar.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";

function NavBar() {
  const location = useLocation();
  const linkStyle = {
    textDecoration: "none",
  };
  return (
    <nav className={NavCSS.content}>
      <Link style={linkStyle} to="/">
        <div className={NavCSS.logo}>🍌 kram kram banane.</div>
      </Link>
      <ul className={NavCSS.ul}>
        <Link style={linkStyle} to="/">
          <li className={location.pathname === "/" ? NavCSS.bold : NavCSS.li}>
            Home
          </li>
        </Link>
        <Link style={linkStyle} to="/products">
          <li
            className={
              location.pathname === "/products" ? NavCSS.bold : NavCSS.li
            }
          >
            Products
          </li>
        </Link>
        <Link style={linkStyle} to="/about">
          <li
            className={location.pathname === "/about" ? NavCSS.bold : NavCSS.li}
          >
            About
          </li>
        </Link>
        <Link style={linkStyle} to="/contact">
          <li
            className={
              location.pathname === "/contact" ? NavCSS.bold : NavCSS.li
            }
          >
            Contact
          </li>
        </Link>
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
