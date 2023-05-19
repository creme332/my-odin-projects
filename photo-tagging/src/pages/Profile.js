import {
  Container,
  Avatar,
  Button,
  Text,
  Flex,
  Title,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import LineChart from "../components/LineChart";
import {
  IconMoonStars,
  IconSun,
  IconLogout,
  IconThumbUpFilled,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useState } from "react";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Profile({isUserSignedIn, userName}) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [errorMsg, setErrorMsg] = useState("");

  async function signIn() {
    // Sign in Firebase with credential from the Google user.
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  function loginScreen() {
    return (
      <Container>
        <Button onClick={signIn} color="red" leftIcon={<IconBrandGoogle />}>
          Login
        </Button>
      </Container>
    );
  }
  function validateUsername(e) {
    const name = e.target.value;
    if (name.length < 5) {
      setErrorMsg("Too short");
      return;
    }
    setErrorMsg("");
  }

  return !isUserSignedIn ? (
    loginScreen()
  ) : (
    <Container mb={20} mt={20}>
      <Flex align={"center"}>
        <Avatar
          variant="filled"
          radius="xl"
          size={"xl"}
          src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}&backgroundColor=ffdfbf`}
        />
        <Container>
          <Title variant="gradient">Hello {userName}!</Title>
          <Text c="dimmed">
            Welcome to your user account. Here you can change your settings and
            see your statistics.
          </Text>
        </Container>
      </Flex>

      <Title mt={30}>Statistics</Title>
      <LineChart />

      <Title mt={30}>Settings</Title>
      <Flex direction={"column"} gap={30}>
        <TextInput
          onChange={validateUsername}
          error={errorMsg}
          minLength={5}
          maxLength={10}
          w={250}
          placeholder="Your name"
          label="Username"
        />
        <Button leftIcon={<IconThumbUpFilled />} type="submit" variant="filled">
          {" "}
          Change username
        </Button>

        <Button
          onClick={() => toggleColorScheme()}
          leftIcon={
            dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />
          }
          variant="filled"
        >
          {" "}
          Toggle theme
        </Button>
        <Button
          onClick={() => {
            signOut(getAuth());
          }}
          leftIcon={<IconLogout />}
          variant="filled"
          color="red"
        >
          {" "}
          Log out
        </Button>
      </Flex>
    </Container>
  );
}
