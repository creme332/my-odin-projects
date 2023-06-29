import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // states for theme
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  //states for user login
  const [loggedIn, setLoggedIn] = useState(false);

  /**
   * Checks if login details are correct
   * @param {String} email
   * @param {String} password
   * @returns {Boolean} True if login details are correct, false otherwise.
   */
  function validateLogin(email, password) {
    console.log(email, password);
    setLoggedIn(true);

    router.push({
      pathname: "/dashboard",
      // query: {
      //   name: "Source Freeze",
      //   count: 30,
      // },
    });
    return true;
    // if (email === "j@me.com" && password === "abcd") {
    //   setLoggedIn(true);
    //   return true;
    // }
    // setLoggedIn(false);
    // return false;
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
              validateLogin={validateLogin}
            />
          </Container>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
