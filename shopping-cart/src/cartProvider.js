import uniqid from "uniqid";
import chiliSrc from "./assets/images/chilli.png";
import naturalSrc from "./assets/images/leaf.png";
import limeSrc from "./assets/images/lime.png";

/**
 * Returns a list of all products available in store inventory
 * @returns list
 */
function getInventory() {
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
  return cardInfo;
}

export default getInventory;