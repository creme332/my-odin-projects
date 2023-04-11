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
      description:
        "Our classic banana chips with no added flavouring.  The natural sweetness and flavour of the bananas are preserved, giving our chips a deliciously satisfying crunch with a subtle hint of tropical sweetness.",
      imgSrc: naturalSrc,
      id: "natural-flavour",
      status: 0,
    },
    {
      title: "Smoky Barbecue",
      price: "18",
      imgAlt: "Smoky Barbecue flavour banana chips",
      description:
        "These chips are infused with smoky flavours from paprika, cumin, and chilli powder to make them a satisfying snack that satisfies cravings.",
      imgSrc: chiliSrc,
      id: "smoky-flavour",
      status: 1,
    },
    {
      title: "Tangy Lime",
      price: "20",
      imgAlt: "Tangy Lime flavour banana chips",
      description:
        "A sprinkle of lime juice and a pinch of salt give the chips a tangy and refreshing twist.",
      imgSrc: limeSrc,
      id: "tangy-flavour",
      status: 2,
    },
  ];
  return cardInfo;
}

export default getInventory;
