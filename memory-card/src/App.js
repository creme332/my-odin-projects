import "./App.css";
import React, { useState } from "react";
import uniqid from "uniqid";
import imgSrc from "./assets/man-with-cat.gif";
import imgSrc1 from "./assets/school-woman.png";
import { GrCircleInformation, GrScorecard } from "react-icons/gr";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { BsTrophyFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CorrectSoundUrl from "./assets/correct-6033.mp3";
import IncorrectSoundUrl from "./assets/error-call-to-attention-129258.mp3";

function SoundButton({ soundOn, setSound }) {
  function onSoundClick() {
    console.log("sound button pressed");
    setSound(!soundOn);
  }

  return (
    <button id="sound-btn" className="tog-btn" onClick={onSoundClick}>
      <IconContext.Provider value={{ size: 42 }}>
        {!soundOn ? <GiSoundOff /> : <GiSoundOn />}
      </IconContext.Provider>
    </button>
  );
}

function InfoButton({ onInfoClick }) {
  return (
    <button id="info-btn" className="tog-btn" size="10x" onClick={onInfoClick}>
      <IconContext.Provider value={{ size: 42 }}>
        <GrCircleInformation />
      </IconContext.Provider>
    </button>
  );
}

function ScoreBoard({ currentScore, bestScore }) {
  return (
    <div className="scores">
      {" "}
      <IconContext.Provider value={{ size: 42 }}>
        <span>
          <GrScorecard /> {currentScore}
        </span>
        <span>
          <BsTrophyFill /> {bestScore}
        </span>
      </IconContext.Provider>
    </div>
  );
}

function CardContainer({
  currentScore,
  bestScore,
  setBestScore,
  setScore,
  soundOn,
}) {
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
  const imgHeight = 150;
  function shuffle() {
    return 0;
  }

  function handleClick() {
    if (soundOn) playAudio(IncorrectSoundUrl);
    setScore(currentScore + 1);
    setBestScore(Math.max(currentScore, bestScore));
  }

  function playAudio(url) {
    const audio = new Audio(url);
    audio.currentTime = 0;
    audio.play();
  }
  return (
    <div className="cards-container">
      {allCards.map((cardDetail) => {
        return (
          <img
            onClick={handleClick}
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
  const [soundOn, setSound] = useState(false);
  // const allCards = [];
  function onInfoClick() {
    console.log("Info button clicked");
  }

  return (
    <div className="App">
      <InfoButton onInfoClick={onInfoClick} />
      <SoundButton soundOn={soundOn} setSound={setSound} />
      <h1 className="game-title"> memory card</h1>
      <CardContainer
        currentScore={score}
        bestScore={bestScore}
        setScore={setScore}
        setBestScore={setBestScore}
        soundOn={soundOn}
      />
      <ScoreBoard currentScore={score} bestScore={bestScore} />
      <footer>
        <span>
          {" "}
          Photos from <a href="https://janet-mac.com/">Janet Mac</a>{" "}
        </span>
      </footer>
    </div>
  );
}

export default App;
