import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import Detail from "./pages/Detail";
import { AnimatePresence } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";

const RouteSwitch = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <BrowserRouter>
      <NavBar drawerOpened={opened} toggleDrawer={{ open, close }} />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Detail toggleDrawer={{ open, close }} />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default RouteSwitch;
