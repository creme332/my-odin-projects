import { createStyles, Container, Group, ActionIcon, rem } from "@mantine/core";
import {
  IconBrandGithub,
  IconMail,
  Icon3dCubeSphere,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),
    lineHeight: 1.8,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group>
          <Icon3dCubeSphere size={28} strokeWidth={2} />
          <h1 className={classes.logo}>Enigma</h1>
        </Group>{" "}
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon
            component="a"
            href="https://github.com/creme332/my-odin-projects/tree/main/photo-tagging"
            size="lg"
          >
            <IconBrandGithub size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href="mailto:c34560814@gmail.com" size="lg">
            <IconMail size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default FooterSocial;
