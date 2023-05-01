import styles from "./../styles/Home.module.css";
import { HeroBullets } from "../components/HeroHeader";
import CardsCarousel from "../components/CardsCarousel";

function Home() {
  return (
    <div className={styles.home}>
      <HeroBullets />
      <h1>Choose your map</h1>
      <CardsCarousel />
    </div>
  );
}

export default Home;
