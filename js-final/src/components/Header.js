import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDropletFilled } from "@tabler/icons-react";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function HeaderMegaMenu({ loggedIn }) {
  const tabs = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Add", link: "/edit" },
    { name: "Account", link: "/account" },
  ];

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  const links = tabs.map((e) => (
    <Link key={`${e.link}-link-key`} className={classes.link} href={e.link}>
      {e.name}
    </Link>
  ));

  return (
    <Box pb={70}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link href="/">
              <ActionIcon variant="transparent" title="Dashboard" color="blue">
                <IconDropletFilled size={30} />
              </ActionIcon>
            </Link>
            {loggedIn ? links : null}
          </Group>

          {loggedIn ? (
            <Group className={classes.hiddenMobile}>
              <Button variant="default">Log out</Button>
            </Group>
          ) : (
            <Group className={classes.hiddenMobile}>
              <Link href={"/account/login"}>
                <Button variant="default">Log in</Button>
              </Link>
              <Link href={"/account/register"}>
                <Button variant="default">Sign up</Button>
              </Link>{" "}
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group> {loggedIn ? links : null}</Group>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {loggedIn ? (
            <Group position="center" grow pb="xl" px="md">
              <Button variant="default">Log out</Button>
            </Group>
          ) : (
            <Group position="center" grow pb="xl" px="md">
              <Link href={"/account/register"}>
                <Button variant="default">Sign up</Button>
              </Link>
              <Link href={"/account/login"}>
                <Button variant="default">Log in</Button>
              </Link>{" "}
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
