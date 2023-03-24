import "./App.css";
import React, { useState, useEffect } from "react";
import getCards from "./cards";
import { GrHelp, GrScorecard } from "react-icons/gr";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import { BsTrophyFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CorrectSoundUrl from "./assets/sound/correct-6033.mp3";
import IncorrectSoundUrl from "./assets/sound/error-call-to-attention-129258.mp3";
import { Popover, Transition } from "@headlessui/react";

function SoundButton({ soundOn, setSound }) {
  function onSoundClick() {
    console.log("sound button pressed");
    setSound(!soundOn);
  }

  return (
    <button
      id="sound-btn"
      className="tog-btn"
      aria-label="toggle sound"
      onClick={onSoundClick}
    >
      <IconContext.Provider value={{ size: 42 }}>
        {!soundOn ? <GiSoundOff /> : <GiSoundOn />}
      </IconContext.Provider>
    </button>
  );
}

function InfoPopover() {
  return (
    <Popover>
      <Popover.Button
        id="info-btn"
        aria-label="toggle popover for instructions"
        className="tog-btn"
      >
        {" "}
        <IconContext.Provider value={{ size: 30 }}>
          <GrHelp />
        </IconContext.Provider>
      </Popover.Button>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="popover-panel">
          <h1>How to play</h1>
          <p>
            Remember all the images that you click on and try not to click on
            the same image more than once. The game restarts when you click on
            the same image twice.
          </p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ScoreBoard({ currentScore, bestScore }) {
  return (
    <div className="scores">
      {" "}
      <IconContext.Provider value={{ size: 42, color: "orange" }}>
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
  selectedCards,
  setSelectedCards,
}) {
  const [allCards, setCards] = useState(getCards());
  const imgHeight = 150;

  useEffect(() => {
    const newCards = [...allCards];
    shuffle(newCards);
    setCards(newCards);
  }, []);

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

  function handleClick(e, imgSrc) {
    // console.log(selectedCards);
    if (selectedCards.has(imgSrc)) {
      //incorrect guess
      if (soundOn) playAudio(IncorrectSoundUrl);
      setScore(0);
      setSelectedCards(new Set());
    } else {
      //correct guess
      if (soundOn) playAudio(CorrectSoundUrl);

      selectedCards.add(imgSrc);
      setSelectedCards(selectedCards);
      setScore(currentScore + 1);
      setBestScore(Math.max(currentScore + 1, bestScore));
    }
    //shuffle cards
    const newCards = [...allCards];
    shuffle(newCards);
    setCards(newCards);
  }

  function playAudio(url) {
    const audio = new Audio(url);
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play();
  }
  return (
    <div className="cards-container">
      {allCards.map((cardDetail) => {
        return (
          <img
            onClick={(e) => handleClick(e, cardDetail.src)}
            key={cardDetail.id}
            src={cardDetail.src}
            height={imgHeight}
            width={imgHeight}
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
  const [selectedCards, setSelectedCards] = useState(new Set());

  return (
    <div className="App">
      <div className="header">
        <InfoPopover />
        <ScoreBoard currentScore={score} bestScore={bestScore} />
        <SoundButton soundOn={soundOn} setSound={setSound} />
      </div>
      <CardContainer
        currentScore={score}
        bestScore={bestScore}
        setScore={setScore}
        setBestScore={setBestScore}
        soundOn={soundOn}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
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
