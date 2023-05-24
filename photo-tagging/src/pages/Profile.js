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
import AuthForm from "../components/AuthForm";
import {
  IconMoonStars,
  IconSun,
  IconLogout,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { StatsGrid } from "../components/StatsGrid";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import FireStoreManager from "../utils/FireStoreManager";
import dateFormat from "../utils/dateFormat";

export default function Profile() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState(null);
  const [isUserSignedIn, setUserSignedIn] = useState(false);
  const fsm = FireStoreManager();
  const [userName, setUserName] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    (async () => {
      const userDataResponse = await fsm.getUserData();
      if (userDataResponse) {
        setUserSignedIn(true);
        console.log(userDataResponse);
        setUserName(userDataResponse.name);
        setUserData(userDataResponse);

        const gameDataResponse = await fsm.getGameDataForUser();
        setGameData(gameDataResponse);
      }
    })();
  }, []);

  function validateUsername(e) {
    const name = e.target.value;
    if (name.length < 5) {
      setErrorMsg("Too short");
      return;
    }
    setNewUserName(name);
    setErrorMsg("");
  }

  function signOutHandler() {
    signOut(getAuth());
    setUserSignedIn(false);
  }

  async function signInHandler() {
    // Sign in Firebase with credential from the Google user.
    try {
      let provider = new GoogleAuthProvider();
      await signInWithPopup(getAuth(), provider);
      fsm.createNewUser();
      setUserSignedIn(true);
    } catch (e) {
      console.log(e);
    }
  }

  function parseGameData() {
    // get all labels. array of date
    const labels = [...new Set(gameData.map((data) => data.date.toDate()))];
    const allMaps = [...new Set(gameData.map((data) => data.mapID))]; // a list of unique map IDs
    console.log(labels, allMaps);

    const datasets = allMaps.map((mapName) => {
      const dataset = {};
      dataset.label = mapName;
      dataset.data = gameData
        .filter((data) => data.mapID === mapName)
        .map((data) => data.duration);
      return dataset;
    });
    console.log(datasets);
    return { labels, datasets: datasets };
  }

  return !isUserSignedIn ? (
    <Flex justify={"center"} mt={20}>
      <AuthForm signIn={signInHandler} />
    </Flex>
  ) : (
    <Container mb={20} mt={20}>
      <Flex align={"center"}>
        <Avatar
          variant="filled"
          radius="xl"
          size={"xl"}
          src={fsm.getPhotoURL()}
          imageProps={{ referrerPolicy: "no-referrer" }}
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
      <StatsGrid
        data={[
          {
            title: "Games started",
            value: userData ? userData.gamesStarted : 0,
            diff: 23,
          },
          {
            title: "Games completed",
            value: userData ? userData.gamesCompleted : 0,
            diff: -5,
          },
          {
            title: "Playing time",
            value: userData
              ? dateFormat(parseInt(userData.totalPlayTime, 10))
              : 0,
            diff: 0,
          },
        ]}
      />
      {gameData && gameData.length > 0 ? (
        <LineChart
          title="Game duration for most recent completed games"
          data={parseGameData()}
        />
      ) : null}

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
        <Button
          onClick={() => {
            if (errorMsg.length === 0 && userName !== fsm.getUsername()) {
              fsm.updateDisplayName(newUserName);
              setUserName(newUserName);
            }
          }}
          leftIcon={<IconThumbUpFilled />}
          type="submit"
          variant="filled"
        >
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
          onClick={signOutHandler}
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
