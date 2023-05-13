import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  rem,
  Rating,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export default function Card({ ...cardInfo }) {
  const { classes } = useStyles();
  // console.log(cardInfo);
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${cardInfo.imgSrc})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {cardInfo.category}
        </Text>
        <Title order={3} className={classes.title}>
          {cardInfo.title}
        </Title>
      </div>
      <Flex
        align="center"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <Link state={cardInfo} to={`/play/${cardInfo.title}`}>
          <Button variant="white" color="dark" disabled={!cardInfo.available}>
            {cardInfo.available ? "Play" : "Coming soon"}
          </Button>
        </Link>
        {cardInfo.available ? (
          <Rating readOnly defaultValue={cardInfo.rating} />
        ) : null}
      </Flex>
    </Paper>
  );
}