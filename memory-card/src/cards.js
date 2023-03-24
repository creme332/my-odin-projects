import uniqid from "uniqid";
import img1 from "./assets/images/1.png";
import img2 from "./assets/images/2.gif";
import img3 from "./assets/images/3.gif";
import img4 from "./assets/images/4.gif";
import img5 from "./assets/images/5.gif";
import img6 from "./assets/images/6.png";
import img7 from "./assets/images/7.png";
import img8 from "./assets/images/8.gif";
import img9 from "./assets/images/9.png";
import img10 from "./assets/images/10.png";
import img11 from "./assets/images/11.gif";
import img12 from "./assets/images/12.png";
import img13 from "./assets/images/13.png";
import img14 from "./assets/images/14.gif";
import img15 from "./assets/images/15.gif";
import img16 from "./assets/images/16.png";
import img17 from "./assets/images/17.gif";

export default function getCards() {
  const allCards = [
    {
      src: img1,
      alt: "Woman wearing makeup.",
      id: uniqid(),
    },
    {
      src: img2,
      alt: "Man on a bicycle",
      id: uniqid(),
    },
    {
      src: img3,
      alt: "Dreaming man",
      id: uniqid(),
    },
    {
      src: img4,
      alt: "Man with cup of coffee",
      id: uniqid(),
    },
    {
      src: img5,
      alt: "Man with VR headset",
      id: uniqid(),
    },
    {
      src: img6,
      alt: "Asian man with turban",
      id: uniqid(),
    },
    {
      src: img7,
      alt: "Asian man with bouquet of flowers",
      id: uniqid(),
    },
    {
      src: img8,
      alt: "Man surrounded with cats",
      id: uniqid(),
    },
    {
      src: img9,
      alt: "Big man with small dog",
      id: uniqid(),
    },
    {
      src: img10,
      alt: "Woman with schoolbag",
      id: uniqid(),
    },
    {
      src: img11,
      alt: "Woman with blue hair",
      id: uniqid(),
    },
    {
      src: img12,
      alt: "Woman with skateboard",
      id: uniqid(),
    },
    {
      src: img13,
      alt: "Man sitting with bread",
      id: uniqid(),
    },
    {
      src: img14,
      alt: "Snowy man",
      id: uniqid(),
    },
    {
      src: img15,
      alt: "Sad dog",
      id: uniqid(),
    },
    {
      src: img16,
      alt: "Woman drinking milkshake",
      id: uniqid(),
    },
    {
      src: img17,
      alt: "Woman watering plants",
      id: uniqid(),
    },
  ];
  return allCards;
}
