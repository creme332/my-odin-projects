import { useState } from "react";
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import styles from "./../styles/HeaderWithTabs.module.css";
import { Link } from "react-router-dom";

export default function HeaderWithTabs({ user, tabs }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };
  const items = tabs.map((tab) => (
    <Link key={tab.id} style={linkStyle} to={tab.pathname}>
      <Tabs.Tab value={tab.tabName}>{tab.tabName}</Tabs.Tab>
    </Link>
  ));

  function getMenu() {
    return (
      <Menu
        width={260}
        position="bottom-end"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton>
            <Group spacing={7}>
              <Avatar src={user.image} alt={user.name} radius="xl" size={40} />
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user.name}
              </Text>
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconHeart size="0.9rem" stroke={1.5} />}>
            Liked posts
          </Menu.Item>
          <Menu.Item icon={<IconStar size="0.9rem" stroke={1.5} />}>
            Saved posts
          </Menu.Item>
          <Menu.Item icon={<IconMessage size="0.9rem" stroke={1.5} />}>
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
            Account settings
          </Menu.Item>
          <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>
            Logout
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            icon={<IconTrash size="0.9rem" stroke={1.5} />}
          >
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return (
    <div className={styles.header}>
      <Group position="apart">
        <Container>
          <Tabs defaultValue="Home" variant="outline">
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
        <Container> {getMenu()}</Container>
      </Group>
    </div>
  );
}
