import { Link } from "react-router-dom";

function NavBar() {
  const navStyle = {
    textDecoration: "none",
  };
  return (
    <nav>
      <div className="logo">🍌 kram kram banane.</div>
      <ul>
        <Link style={navStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={navStyle} to="/products">
          <li>Products</li>
        </Link>
        <Link style={navStyle} to="/about">
          <li>About</li>
        </Link>
        <Link style={navStyle} to="/contact">
          <li>Contact</li>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
