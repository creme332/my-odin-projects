import "./App.css";
import { useState } from "react";
import React from "react";
import uniqid from "uniqid";
import imgSrc from "./assets/man-with-cat.gif";
import imgSrc1 from "./assets/school-woman.png";

function SoundButton({ onSoundClick }) {
  const [soundOn, setSound] = useState(0);
  // setSound(soundOn);
  return <button onClick={onSoundClick}>Sound</button>;
}

function InfoButton({ onInfoClick }) {
  return <button onClick={onInfoClick}>Info</button>;
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
  // const allCards = [];

  function onSoundClick() {
    console.log("Sound button clicked");
  }

  function onInfoClick() {
    console.log("Info button clicked");
  }

  return (
    <div className="App">
      <InfoButton onInfoClick={onInfoClick} />
      <SoundButton onSoundClick={onSoundClick} />
      <h1>memory card</h1>
      <CardContainer />
    </div>
  );
}

export default App;
