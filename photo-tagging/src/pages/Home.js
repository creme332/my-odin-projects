import styles from "./../styles/Home.module.css";
import { HeroBullets } from "../components/HeroHeader";
import CardsCarousel from "../components/CardsCarousel";
import { Container } from "@mantine/core";
import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.8,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },
  homepage: {
    paddingBottom: "20px",
  },
}));

function Home() {
  const { classes } = useStyles();
  return (
    <Container className={classes.homepage}>
      <HeroBullets />
      <h1 className={classes.title}>Choose your map</h1>
      <CardsCarousel />
    </Container>
  );
}

export default Home;
