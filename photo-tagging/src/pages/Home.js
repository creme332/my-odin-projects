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
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Explorer's Realm",
      category: "nature",
      available: true,
      rating: 3,
    },
    {
      image:
        "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Adventure Atlas",
      category: "beach",
      available: true,
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Pathfinder's Playground",
      category: "nature",
      available: true,
      rating: 2,
    },
    {
      image:
        "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Navigator's Nirvana",
      category: "nature",
      available: false,
      rating: 3,
    },
    {
      image:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Map Maverick",
      category: "tourism",
      available: false,
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      title: "Enigma Forever",
      category: "nature",
      available: false,
      rating: 5,
    },
  ];
  return (
    <Container className={classes.homepage}>
      <HeroBullets />
      <h1 className={classes.title}>Choose your map</h1>
      <CardsCarousel data={data} />
    </Container>
  );
}

export default Home;
