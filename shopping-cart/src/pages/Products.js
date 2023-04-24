import ProdCSS from "./../styles/Products.module.css";
import Card from "../components/Card";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import getInventory from "../utils/cartProvider";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import { Input } from '@mantine/core';
import { useState } from "react";

function Products() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const inventory = getInventory();

  return (
    <motion.div
      className={ProdCSS.products}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <h1 className="defaultH1">Our flavours</h1>

      <Input maxLength={20}
        onChange={(e) => setSearchBarValue(e.target.value)}
        icon={<BiSearch />
        }
        placeholder="Search..."
        radius="xl"
        size="md"
        aria-label="search bar"
      />

      <div className={ProdCSS.cardContainer}>
        {inventory.map((card) => {
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
        })}
      </div>
    </motion.div>
  );
}

export default Products;
