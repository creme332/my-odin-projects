import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import leafLogo from "./assets/images/leaf.png";
import HeaderWithTabs from "./components/HeaderWithTabs";
import Leaderboard from "./pages/Leaderboard";
import Play from "./pages/Play";
import uniqid from "uniqid";

const RouteSwitch = () => {
  const [user, setUser] = useState({ name: "John", image: leafLogo });
  const tabs = [
    { tabName: "Home", pathname: "/", id: uniqid() },
    { tabName: "Play", pathname: "/play", id: uniqid() },
    { tabName: "Leaderboard", pathname: "/leaderboard", id: uniqid() },
  ];
  return (
    <BrowserRouter basename="/my-odin-projects/photo-tagging/build">
      <HeaderWithTabs user={user} tabs={tabs} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
