import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import leafLogo from "./assets/images/detective.png";
import HeaderWithTabs from "./components/HeaderWithTabs";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import uniqid from "uniqid";
import { MantineProvider } from "@mantine/core";

const RouteSwitch = () => {
  const [user, setUser] = useState({ name: "John", image: leafLogo });
  const tabs = [
    { tabName: "Home", pathname: "/", id: uniqid() },
    { tabName: "Leaderboard", pathname: "/leaderboard", id: uniqid() },
  ];
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter basename="/my-odin-projects/photo-tagging/build">
        <HeaderWithTabs links={tabs} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

export default RouteSwitch;
