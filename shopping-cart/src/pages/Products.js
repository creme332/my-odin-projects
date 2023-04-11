import ProdCSS from "./../styles/Products.module.css";
import Card from "../components/Card";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import getInventory from "../cartProvider";
import { Link } from "react-router-dom";

function Products() {
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
      <div className={ProdCSS.searchBar}>
        <input maxLength={20} placeholder="Search..." type="text" />
        <div className={ProdCSS.searchIcon}>
          <IconContext.Provider value={{ size: 25 }}>
            <BiSearch />
          </IconContext.Provider>
        </div>
      </div>
      <div className={ProdCSS.cardContainer}>
        {inventory.map((card) => {
          return (
            <Link
              key={card.id}
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
