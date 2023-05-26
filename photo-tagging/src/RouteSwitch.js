import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeaderWithTabs from "./components/HeaderWithTabs";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import uniqid from "uniqid";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import Profile from "./pages/Profile";
import FooterSocial from "./components/Footer";

const RouteSwitch = () => {
  const tabs = [
    { tabName: "Home", pathname: "/", id: uniqid() },
    { tabName: "Profile", pathname: "/profile", id: uniqid() },
    { tabName: "Leaderboard", pathname: "/leaderboard", id: uniqid() },
  ];
  const [colorScheme, setColorScheme] = useState("dark");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
        <BrowserRouter>
          <HeaderWithTabs links={tabs} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
          <FooterSocial />
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default RouteSwitch;
