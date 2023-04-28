import ProdCSS from "./../styles/Products.module.css";
import Card from "../components/Card";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import getInventory from "../utils/cartProvider";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import { useState } from "react";
import { Autocomplete } from '@mantine/core';
import { Text } from "@mantine/core";

function Products() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const inventory = getInventory();

  function getMatchedProducts() {
    const regex = new RegExp(searchBarValue, "i");
    const foundProductCount = inventory.reduce((acc, card) => acc + (regex.test(card.title) ? 1 : 0), 0);
    if (foundProductCount === 0) {
      return (
        <Text
          ta="center"
          sx={{ margin: "auto" }}
          fz="xl"
          fw={500} align="center">Flavour not found 😥
        </Text>
      );
    }

    return (inventory.map((card) => {
      const regex = new RegExp(searchBarValue, "i");
      if (!regex.test(card.title)) {
        return null;
      }
      return (
        <Link
          key={uniqid()}
          style={{ textDecoration: "none" }}
          state={card}
          to={`/products/${card.id}`}
        >
          <Card
            title={card.title}
            price={card.price}
            imgAlt={card.imgAlt}
            imgSrc={card.imgSrc}
            status={card.status}
          />
        </Link>
      );
    }))
  }
  return (
    <motion.div
      className={ProdCSS.products}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <h1 className="defaultH1">Our flavours</h1>

      <Autocomplete
        onChange={(value) => setSearchBarValue(value)}
        icon={<BiSearch />}
        placeholder="Search..."
        radius="xl"
        size="md"
        maxDropdownHeight="100"
        aria-label="search bar"
        data={inventory.map(el => el.title)}
      />

      <div className={ProdCSS.cardContainer}>
        {getMatchedProducts()}
      </div>
    </motion.div>
  );
}

export default Products;
