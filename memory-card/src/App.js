import "./App.css";
import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import imgSrc from "./assets/man-with-cat.gif";
import imgSrc1 from "./assets/school-woman.png";
import { GrCircleInformation } from "react-icons/gr";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { IconContext } from "react-icons";
import CorrectSoundUrl from "./assets/correct-6033.mp3";
import IncorrectSoundUrl from "./assets/error-call-to-attention-129258.mp3";

function SoundButton() {
  const [soundOn, setSound] = useState(false);
  const [playing, toggle] = useAudio(CorrectSoundUrl);
  const [playingx, togglec] = useAudio(CorrectSoundUrl);

  function onSoundClick() {
    console.log("sound button pressed");
    setSound(!soundOn);
    toggle();
  }

  return (
    <button className="tog-btn" onClick={onSoundClick}>
      <IconContext.Provider value={{ size: 42 }}>
        {soundOn ? <GiSoundOff /> : <GiSoundOn />}
      </IconContext.Provider>
    </button>
  );
}

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : (audio.currentTime = 0);
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

function InfoButton({ onInfoClick }) {
  return (
    <button className="tog-btn" size="10x" onClick={onInfoClick}>
      <IconContext.Provider value={{ size: 42 }}>
        <GrCircleInformation />
      </IconContext.Provider>
    </button>
  );
}

function CardContainer() {
  const allCards = [
    {
      src: imgSrc,
      alt: "alt text",
      id: uniqid(),
    },
    {
      src: imgSrc,
      alt: "alt text",
      id: uniqid(),
    },
    {
      src: imgSrc,
      alt: "alt text",
      id: uniqid(),
    },
    {
      src: imgSrc1,
      alt: "alt text",
      id: uniqid(),
    },
    {
      src: imgSrc1,
      alt: "alt text",
      id: uniqid(),
    },
  ];
  const imgHeight = 250;

  function shuffle() {
    return 0;
  }
  return (
    <div className="card-container">
      {allCards.map((cardDetail) => {
        return (
          <img
            key={cardDetail.id}
            src={cardDetail.src}
            height={imgHeight}
            alt={cardDetail.alt}
          />
        );
      })}
    </div>
  );
}
function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // const allCards = [];
  function onInfoClick() {
    console.log("Info button clicked");
  }

  return (
    <div className="App">
      <InfoButton onInfoClick={onInfoClick} />
      <SoundButton />
      <h1>memory card</h1>
      <CardContainer />
    </div>
  );
}

export default App;
