import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";
import Detail from "./pages/Detail";
import { AnimatePresence } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import CartButton from "./components/CartButton";
import ShoppingCart from "./components/ShoppingCart";

const RouteSwitch = () => {
  const [opened, { open, close }] = useDisclosure(false); // for drawer
  const [cart, setCart] = useState([]); // cart of user

  function getCartDrawer() {
    function getShoppingCart() {
      return <ShoppingCart cart={cart} setCart={setCart} />;
    }
    const totalCartItems = cart.reduce(
      (accumulator, el) => accumulator + el.count,
      0
    );
    return <CartButton totalCartItems={totalCartItems} drawerOpened={opened} toggleDrawer={{ open, close }} drawerChildren={getShoppingCart()} />;
  }

  return (
    <BrowserRouter
      basename="/my-odin-projects/shopping-cart/build" // comment this line if running Jest tests
    >
      <NavBar lastChild={getCartDrawer()} />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Detail cart={cart} setCart={setCart} toggleDrawer={{ open, close }} />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default RouteSwitch;
