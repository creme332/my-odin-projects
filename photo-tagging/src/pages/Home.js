import styles from "./../styles/Home.module.css";
import { HeroBullets } from "../components/HeroHeader";
import CardsCarousel from "../components/CardsCarousel";
import { Container } from "@mantine/core";

function Home() {
  return (
    <Container>
      <HeroBullets />
      <h1>Choose your map</h1>
      <CardsCarousel />
    </Container>
  );
}

export default Home;
