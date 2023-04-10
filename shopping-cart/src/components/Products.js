import ProdCSS from "./../styles/Products.module.css";
import Card from "./Card";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import uniqid from "uniqid";
import chiliSrc from "./../assets/images/chilli.png";
import naturalSrc from "./../assets/images/leaf.png";
import limeSrc from "./../assets/images/lime.png";
import { motion } from "framer-motion";

function Products() {
  const cardInfo = [
    {
      title: "Natural",
      price: "15",
      imgAlt: "Natural flavour banana chips",
      imgSrc: naturalSrc,
      id: uniqid(),
      status: 0,
    },
    {
      title: "Smoky Barbecue",
      price: "18",
      imgAlt: "Smoky Barbecue flavour banana chips",
      imgSrc: chiliSrc,
      id: uniqid(),
      status: 1,
    },
    {
      title: "Tangy Lime",
      price: "20",
      imgAlt: "Tangy Lime flavour banana chips",
      imgSrc: limeSrc,
      id: uniqid(),
      status: 2,
    },
  ];
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
        {cardInfo.map((card) => {
          return (
            <Card
              key={card.id}
              title={card.title}
              price={card.price}
              imgAlt={card.imgAlt}
              imgSrc={card.imgSrc}
              status={card.status}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export default Products;
