import uniqid from "uniqid";

import marvelUniverseMap from "../assets/images/maps//marvel-universe/marvel-universe.jpg";
import m1 from "../assets/images/maps//marvel-universe/characters/1.png";
import m2 from "../assets/images/maps//marvel-universe/characters/2.png";
import m3 from "../assets/images/maps//marvel-universe/characters/3.png";
import m4 from "../assets/images/maps//marvel-universe/characters/4.png";

/**
 * Returns a dictionary containing all information about all maps
 * @returns
 */
export default function getAllMaps() {
  const mapInfo = [
    {
      title: "Marvel Universe",
      category: "Marvel",
      rating: 3,
      imgSrc: marvelUniverseMap,
      imgAlt: "Wallpaper of marvel characters",
      available: true,
      characters: [
        {
          id: "marvel-1",
          topPos: "188px",
          leftPos: "550px",
          hitboxRadius: "25px",
          imgSrc: m1,
          imgAlt: "A pensive duck",
        },
        {
          id: "marvel-2",
          topPos: "218px",
          leftPos: "128px",
          hitboxRadius: "23px",
          imgSrc: m2,
          imgAlt: "Yellow-haired man with red vest",
        },
        {
          id: "marvel-3",
          topPos: "313px",
          leftPos: "408px",
          hitboxRadius: "30px",
          imgSrc: m3,
          imgAlt: "Shocked yellow haired woman",
        },
        {
          id: "marvel-4",
          topPos: "275px",
          leftPos: "226px",
          hitboxRadius: "20px",
          imgSrc: m4,
          imgAlt: "Iron man in red costume",
        },
      ],
    },
  ];
  return mapInfo;
}
