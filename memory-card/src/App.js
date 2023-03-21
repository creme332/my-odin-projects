import "./App.css";
import React, { useState } from "react";
import getCards from "./cards";
import { GrCircleInformation, GrScorecard } from "react-icons/gr";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { BsTrophyFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CorrectSoundUrl from "./assets/sound/correct-6033.mp3";
import IncorrectSoundUrl from "./assets/sound/error-call-to-attention-129258.mp3";

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
        <span className="score-item">
          <GrScorecard /> {currentScore}
        </span>
        <span className="score-item">
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
  const [allCards] = useState(getCards());

  const imgHeight = 150;
  const totalDisplayedCards = 15;
  function shuffle(array) {
    // fisher yates shuffle : https://stackoverflow.com/a/2450976/17627866
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function handleClick() {
    if (soundOn) playAudio(IncorrectSoundUrl);
    setScore(currentScore + 1);
    setBestScore(Math.max(currentScore + 1, bestScore));
    shuffle(allCards);
    console.log(allCards);
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

  function onInfoClick() {
    console.log("Info button clicked");
  }

  return (
    <div className="App">
      <div className="header">
        <InfoButton onInfoClick={onInfoClick} />
        <ScoreBoard currentScore={score} bestScore={bestScore} />
        <SoundButton soundOn={soundOn} setSound={setSound} />
      </div>

      {/* <h1 className="game-title"> memory card</h1> */}
      <CardContainer
        currentScore={score}
        bestScore={bestScore}
        setScore={setScore}
        setBestScore={setBestScore}
        soundOn={soundOn}
      />
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
