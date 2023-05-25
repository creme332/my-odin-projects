import marvelUniverseMap from "../assets/images/maps//marvel-universe/marvel-universe.jpg";
import marvelLogo from "../assets/images/maps//marvel-universe/marvel-logo.jpg";
import m1 from "../assets/images/maps/marvel-universe/characters/1.png";
import m2 from "../assets/images/maps/marvel-universe/characters/2.png";
import m3 from "../assets/images/maps/marvel-universe/characters/3.png";
import m4 from "../assets/images/maps/marvel-universe/characters/4.png";
import m5 from "../assets/images/maps/marvel-universe/characters/5.png";

import AnimePartyMap from "../assets/images/maps/anime-party/anime-party.jpg";
import animeLogo from "../assets/images/maps/anime-party/anime-logo.webp";
import a1 from "../assets/images/maps/anime-party/characters/1.png";
import a2 from "../assets/images/maps/anime-party/characters/2.png";
import a3 from "../assets/images/maps/anime-party/characters/3.png";
import a4 from "../assets/images/maps/anime-party/characters/4.png";
import a5 from "../assets/images/maps/anime-party/characters/5.png";
import a6 from "../assets/images/maps/anime-party/characters/6.png";

import PixelMadnessMap from "../assets/images/maps/pixel-madness/pixel-madness.png";
import PixelLogo from "../assets/images/maps/pixel-madness/pixel-logo.webp";
import p1 from "../assets/images/maps/pixel-madness/characters/1.png";
import p2 from "../assets/images/maps/pixel-madness/characters/2.png";
import p3 from "../assets/images/maps/pixel-madness/characters/3.png";
import p4 from "../assets/images/maps/pixel-madness/characters/4.png";
import p5 from "../assets/images/maps/pixel-madness/characters/5.png";

import Moon from "../assets/images/maps/magical-moon/moon.webp";

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
      logoSrc: marvelLogo,
      logoAlt: "Marvel logo",
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
        {
          id: "marvel-5",
          topPos: "176px",
          leftPos: "510px",
          hitboxRadius: "25px",
          imgSrc: m5,
          imgAlt: "Red woman with mask and blue hair",
        },
      ],
    },
    {
      title: "Anime Party",
      category: "Anime",
      rating: 5,
      imgSrc: AnimePartyMap,
      imgAlt: "Wallpaper of anime characters",
      logoSrc: animeLogo,
      logoAlt: "Purple anime background",
      available: true,
      characters: [
        {
          id: "animeparty-1",
          topPos: `${160}px`,
          leftPos: `${68}px`,
          hitboxRadius: `${20}px`,
          imgSrc: a1,
          imgAlt: "blue haired girl",
        },
        {
          id: "animeparty-2",
          topPos: `${5}px`,
          leftPos: `${423}px`,
          hitboxRadius: `${20}px`,
          imgSrc: a2,
          imgAlt: "girl from one piece",
        },
        {
          id: "animeparty-3",
          topPos: `${204}px`,
          leftPos: `${298}px`,
          hitboxRadius: `${25}px`,
          imgSrc: a3,
          imgAlt: "sad boy",
        },
        {
          id: "animeparty-4",
          topPos: `${1}px`,
          leftPos: `${185}px`,
          hitboxRadius: `${25}px`,
          imgSrc: a4,
          imgAlt: "frieza from DBZ",
        },
        {
          id: "animeparty-5",
          topPos: `${60}px`,
          leftPos: `${533}px`,
          hitboxRadius: `${20}px`,
          imgSrc: a5,
          imgAlt: "yugi",
        },
        {
          id: "animeparty-6",
          topPos: `${16}px`,
          leftPos: `${70}px`,
          hitboxRadius: `${20}px`,
          imgSrc: a6,
          imgAlt: "goku from dbz",
        },
      ],
    },
    {
      title: "Pixel Madness",
      category: "Madness",
      rating: 5,
      imgSrc: PixelMadnessMap,
      imgAlt: "Wallpaper of pixel characters",
      logoSrc: PixelLogo,
      logoAlt: "Marvel logo",
      available: true,
      characters: [
        {
          id: "pixel-1",
          topPos: `${5}px`,
          leftPos: `${88}px`,
          hitboxRadius: `${20}px`,
          imgSrc: p1,
          imgAlt: "Violet mermaid",
        },
        {
          id: "pixel-2",
          topPos: `${20}px`,
          leftPos: `${420}px`,
          hitboxRadius: `${6}px`,
          imgSrc: p2,
          imgAlt: "Standing pig",
        },
        {
          id: "pixel-3",
          topPos: `${180}px`,
          leftPos: `${305}px`,
          hitboxRadius: `${20}px`,
          imgSrc: p3,
          imgAlt: "Huge Purple Slime",
        },
        {
          id: "pixel-4",
          topPos: `${105}px`,
          leftPos: `${52}px`,
          hitboxRadius: `${10}px`,
          imgSrc: p4,
          imgAlt: "Fire emoji",
        },
        {
          id: "pixel-5",
          topPos: `${168}px`,
          leftPos: `${548}px`,
          hitboxRadius: `${15}px`,
          imgSrc: p5,
          imgAlt: "Green bug",
        },
      ],
    },
    {
      title: "Magical Moon",
      category: "Top Secret",
      rating: 0,
      imgSrc: null,
      imgAlt: null,
      logoSrc: Moon,
      logoAlt: "A background of the moon",
      available: false,
      characters: [],
    },
  ];
  return mapInfo;
}
