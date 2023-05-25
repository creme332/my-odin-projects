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
  onAuthStateChanged,
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
  const [gameData, setGameData] = useState(null);
  const [NameTextboxValue, setNameTextboxValue] = useState("");

  async function authStateObserver(user) {
    console.log("Auth state changed");
    if (user) {
      // user is signed in
      setUserSignedIn(true);

      // check if user is a new user
      const userDataResponse = await FireStoreManager().getUserData();

      if (userDataResponse && userDataResponse.length === 0) {
        // user is new
        setUserName(user.displayName);
        FireStoreManager().createNewUser();
      } else {
        // user is not new

        setUserName(userDataResponse.displayName);

        // fetch data about previous games of user
        const gameDataResponse = await FireStoreManager().getGameDataForUser();
        if (gameDataResponse) setGameData(gameDataResponse);
        setUserData(userDataResponse);
      }
    } else {
      // user signed out
      setUserSignedIn(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(getAuth(), authStateObserver);
  }, []);

  /**
   * Returns true if username is valid
   * @param {String} newName new display name
   * @returns {Boolean}
   */
  function validateUsername(newName) {
    if (newName.length < 5) {
      setErrorMsg("Too short");
      return false;
    }

    if (userName === newName) {
      setErrorMsg("Same as current name");
      return false;
    }

    setErrorMsg("");

    return true;
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
    } catch (e) {
      console.log(e);
    }
  }

  function parseGameData() {
    // get all labels. array of date
    const labels = [...new Set(gameData.map((data) => data.date.toDate()))];
    const allMaps = [...new Set(gameData.map((data) => data.mapID))]; // a list of unique map IDs
    // console.log(labels, allMaps);

    const datasets = allMaps.map((mapName) => {
      const dataset = {};
      dataset.label = mapName;
      dataset.data = gameData
        .filter((data) => data.mapID === mapName)
        .map((data) => data.duration);
      return dataset;
    });
    // console.log(datasets);
    return { labels, datasets: datasets };
  }

  function getProfileComponent() {
    return (
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
              Welcome to your user account. Here you can change your settings
              and see your statistics.
            </Text>
          </Container>
        </Flex>

        <Title mt={30}>Statistics</Title>
        <StatsGrid
          data={[
            {
              title: "Games started",
              value: userData ? userData.gamesStarted : 0,
              icon: "IconPlayerPlay",
            },
            {
              title: "Games completed",
              value: userData ? userData.gamesCompleted : 0,
              icon: "IconTrophy",
            },
            {
              title: "Playing time",
              value: userData
                ? dateFormat(parseInt(userData.totalPlayTime, 10))
                : 0,
              icon: "IconClock",
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
            onChange={(e) => {
              const newName = e.target.value.trim();
              validateUsername(newName);
              setNameTextboxValue(newName);
            }}
            error={errorMsg}
            minLength={5}
            maxLength={10}
            w={250}
            placeholder="Your name"
            label="Username"
          />
          <Button
            onClick={() => {
              if (validateUsername(NameTextboxValue)) {
                fsm.updateDisplayName(NameTextboxValue);
                setUserName(NameTextboxValue);
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
  return !isUserSignedIn ? (
    <Flex justify={"center"} mt={20}>
      <AuthForm signIn={signInHandler} />
    </Flex>
  ) : (
    getProfileComponent()
  );
}
