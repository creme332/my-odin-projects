import { HeroBullets } from "../components/HeroHeader";
import CardsCarousel from "../components/CardsCarousel";
import { Container } from "@mantine/core";
import { createStyles, rem } from "@mantine/core";
import getAllMaps from "../utils/mapProvider";
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
}));

function Home() {
  const { classes } = useStyles();

  return (
    <Container mb={20}>
      <HeroBullets />
      <h1 className={classes.title}>Choose your map</h1>
      <CardsCarousel data={getAllMaps()} />
    </Container>
  );
}

export default Home;
