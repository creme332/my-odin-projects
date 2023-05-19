import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeaderWithTabs from "./components/HeaderWithTabs";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import uniqid from "uniqid";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import Profile from "./pages/Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const RouteSwitch = () => {
  const tabs = [
    { tabName: "Home", pathname: "/", id: uniqid() },
    { tabName: "Profile", pathname: "/profile", id: uniqid() },
    { tabName: "Leaderboard", pathname: "/leaderboard", id: uniqid() },
  ];
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  // firebase stuffs
  const [isUserSignedIn, setUserSignedIn] = useState(!!getAuth().currentUser);
  const [userName, setUserName] = useState(null);
  const [userProfileURL, setUserProfileURL] = useState(null);

  useEffect(() => {
    // Triggers when the auth state change for instance when the user signs-in or signs-out.
    function authStateObserver(user) {
      // return;
      if (user) {
        // User is signed in!
        setUserSignedIn(true);
        setUserName(getAuth().currentUser.displayName);
        setUserProfileURL(
          getAuth().currentUser.photoURL ||
            `https://api.dicebear.com/6.x/bottts/svg?seed=${userName}&backgroundColor=ffdfbf`
        );
      } else {
        // User is signed out!
        setUserSignedIn(false);
        setUserName(null);
      }
    }

    // Initiate firebase auth
    // ! Dont call directly outside of useEffect or else page becomes unresponsive when theme is toggled
    onAuthStateChanged(getAuth(), authStateObserver);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter basename="/my-odin-projects/photo-tagging/build">
          <HeaderWithTabs links={tabs} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play/:id" element={<Play />} />
            <Route
              path="/profile"
              element={
                <Profile
                  isUserSignedIn={isUserSignedIn}
                  userName={userName}
                  profileURL={userProfileURL}
                />
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default RouteSwitch;
