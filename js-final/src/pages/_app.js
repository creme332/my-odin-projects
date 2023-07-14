import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import getHabits from "@/habit";
import rebalanceEntries from "@/utils/rebalance";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // states for theme
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  //states for user
  const [loggedIn, setLoggedIn] = useState(true);
  const [habits, setHabits] = useState(null);

  useEffect(() => {
    let x = getHabits();

    // rebalance
    x.forEach((habit) => {
      const newEntryList = rebalanceEntries(
        habit.startDate,
        habit.entries,
        habit.dailyDefault
      );
      habit.entries = newEntryList;
      return habit;
    });
    setHabits(x);
  }, []);

  /**
   * Checks if login details are correct
   * @param {String} email
   * @param {String} password
   * @returns {Boolean} True if login details are correct, false otherwise.
   */
  function validateLogin(email, password) {
    console.log(`Logged in with ${email} ${password}`);
    setLoggedIn(true);

    router.push({
      pathname: "/dashboard",
      // query: {
      //   name: "Source Freeze",
      //   count: 30,
      // },
    });
    return true;
  }

  function updateHabit(newHabit) {
    const idx = habits.findIndex(({ id }) => id === newHabit.id);
    const newArr = [...habits];

    if (idx === -1) {
      // add new habit
      console.log("New habit added");

      newArr.push(newHabit);
    } else {
      //update existing habit
      console.log("Existing habit updated");

      newArr[idx] = newHabit;
    }

    setHabits(newArr);
    console.log(newArr);
  }

  function logOut() {
    console.log("Logged out");
    setLoggedIn(false);

    router.push({
      pathname: "/",
    });
  }

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {" "}
          <Head>
            <meta charSet="utf-8" />
            <link
              rel="icon"
              href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💧</text></svg>"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="description of website here" />
            <title>qkwiqq</title>
          </Head>
          <Header loggedIn={loggedIn} logOut={logOut} />
          <Container>
            <Component
              {...pageProps}
              loggedIn={loggedIn}
              habits={habits}
              validateLogin={validateLogin}
              updateHabit={updateHabit}
            />
          </Container>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
