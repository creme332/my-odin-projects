import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Detail from "./components/Detail";
import { AnimatePresence } from "framer-motion";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Detail />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default RouteSwitch;
