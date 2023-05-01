import { Link } from "react-router-dom";
import leaf from "./../assets/images/leaf.png";
import "./../styles/Home.css";

function Home() {
  return (
    <div className="Home">
      <header>
        <p>⚛ cra-template</p>
        <img height={100} width={100} src={leaf} alt="A leaf" />
        <Link to="/contact">
          <p>Go to contact</p>
        </Link>
      </header>
    </div>
  );
}

export default Home;
