import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconJewishStarFilled } from "@tabler/icons-react";
import image from "./../assets/images/detective.webp";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    // paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export function HeroBullets() {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A
            <Text
              span
              inherit
              variant="gradient"
              gradient={{ from: "#a77bf3", to: "#93f5ec", deg: 45 }}
            >
              {" fun"}
            </Text>{" "}
            photo tagging game
          </Title>
          <Text color="dimmed" mt="md">
            Challenge yourself to find the hidden character in each scene, and
            see how fast you can do it. With randomized characters and
            difficulty levels, each game is a unique experience.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconJewishStarFilled size={rem(12)} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Leaderboard</b> – Compare your performance with others
            </List.Item>
            <List.Item>
              <b>Mobile-responsive</b> – play on any screen sizes!
            </List.Item>
            <List.Item>
              <b>Unique backgrounds</b> – Never get bored playing the same maps
            </List.Item>
          </List>
        </div>
        <Image
          h={344}
          w={344}
          withPlaceholder
          src={image}
          className={classes.image}
          alt="Detective with a hat, a coat and holding a "
        />
      </div>
    </Container>
  );
}
