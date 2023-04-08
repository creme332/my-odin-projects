import ProdCSS from "./../styles/Products.module.css";
import Card from "./Card";
import { BiSearch } from "react-icons/bi";
import { IconContext } from "react-icons";
import uniqid from "uniqid";
import chiliSrc from "./../assets/images/chilli.png";
import naturalSrc from "./../assets/images/leaf.png";
import limeSrc from "./../assets/images/lime.png";

function Products() {
  const cardInfo = [
    {
      title: "Natural",
      price: "15",
      imgAlt: "Natural flavour banana chips",
      imgSrc: naturalSrc,
      id: uniqid(),
    },
    {
      title: "Smoky Barbecue",
      price: "18",
      imgAlt: "Smoky Barbecue flavour banana chips",
      imgSrc: chiliSrc,
      id: uniqid(),
    },
    {
      title: "Tangy Lime",
      price: "20",
      imgAlt: "Tangy Lime flavour banana chips",
      imgSrc: limeSrc,
      id: uniqid(),
    },
  ];
  return (
    <div className={ProdCSS.products}>
      <h1 className="defaultH1">Our flavours</h1>
      <div className={ProdCSS.searchBar}>
        <div className={ProdCSS.searchIcon}>
          <IconContext.Provider value={{ size: 25 }}>
            <BiSearch />
          </IconContext.Provider>
        </div>
        <input maxLength={20} placeholder="Search..." type="text" />
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Products;
