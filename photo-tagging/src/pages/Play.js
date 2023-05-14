import { Container } from "@mantine/core";
import React, { useEffect } from "react";
import { ActionIcon, Flex, Image } from "@mantine/core";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
import HitBox from "../components/HitBox";
import Character from "../components/Character";
import uniqid from "uniqid";
import sleep from "../utils/sleep";
import GameScreen from "../components/GameScreen";
import { useLocation } from "react-router-dom";

// const useStyles = createStyles((theme) => ({}));

function Play() {
  const mapInfo = useLocation().state;

  // choose at most 4 characters randomly before start of game
  const [randomCharacters, setRandomCharacters] = useState(
    shuffle(mapInfo.characters).slice(0, 3)
  );

  const [remainingCharacters, setRemainingCharacters] = useState(
    randomCharacters.map((character) => {
      character.found = false;
      return character;
    })
  ); // characters which have not been found yet

  const [zoomAvailable, setZoomAvailable] = useState(true); //zoom to character
  const [helpCount, setHelpCount] = useState(0); //number of times zoom help is used

  const hitboxes = randomCharacters.map((character) => {
    return (
      <HitBox
        key={uniqid()}
        id={character.id}
        size={character.hitboxRadius}
        topPos={character.topPos}
        leftPos={character.leftPos}
        handleClick={() => updateRemainingChars(character.id)}
      />
    );
  });

  const [transformState, setTransformState] = useState({
    scale: 2,
    positionX: 0,
    positionY: 0,
  }); //zoom scale for map

  const [time, setTime] = useState(0); // start time

  useEffect(() => {
    setTime(Date.now());
    return () => {
      setTime(0);
    };
  }, []);

  /**
   * Shuffles array using Fisher-Yates shuffle
   *
   * https://stackoverflow.com/a/2450976/17627866
   * @param {*} array
   * @returns
   */
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
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

  function endGame() {
    const endTime = Date.now();
    const playerTime = parseInt((endTime - time) / 1000, 10);
    // console.log(`Difference ${playerTime}`);

    return (
      <GameScreen
        difficulty={mapInfo.rating}
        mapName={mapInfo.title}
        helpCount={helpCount}
        characterCount={randomCharacters.length}
        time={playerTime}
      />
    );
  }

  function handleTransformation(e) {
    setTransformState(e.instance.transformState);
  }

  /**
   * Disables zoom to character option temporarily for a set time.
   */
  async function startDelay() {
    const seconds = 60;
    setZoomAvailable(false);
    for (let i = 0; i < seconds; i++) {
      await sleep(1000);
      // console.log(i + 1);
    }
    setZoomAvailable(true);
  }

  /**
   * Update list of remaining characters
   * @param {string} charID id of character clicked on
   */
  function updateRemainingChars(charID) {
    const newArray = remainingCharacters.filter((char) => char.id !== charID);
    setRemainingCharacters(newArray);
  }

  return (
    <Container style={{ paddingBottom: "20px" }}>
      {" "}
      {remainingCharacters.length === 0 ? endGame() : null}
      <h1>Find characters</h1>
      <TransformWrapper
        initialScale={transformState.scale}
        onTransformed={(e) => handleTransformation(e)}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <React.Fragment>
            <Flex justify="space-around">
              {randomCharacters.map((char) => {
                const notFoundCharIDs = remainingCharacters.map((c) => c.id); // id of characters which have not been found yet
                return (
                  <Character
                    key={uniqid()}
                    imgSrc={char.imgSrc}
                    found={!notFoundCharIDs.includes(char.id)}
                    zoomAvailable={zoomAvailable}
                    zoomToCharacter={() => {
                      setHelpCount(helpCount + 1);
                      zoomToElement(char.id);
                      startDelay();
                    }}
                  />
                );
              })}
            </Flex>

            <Flex gap={10}>
              <ActionIcon
                color="orange"
                onClick={() => zoomIn()}
                variant="light"
                title="Zoom in"
              >
                <IconZoomIn size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => zoomOut()}
                variant="light"
                title="Zoom out"
              >
                <IconZoomOut size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => resetTransform()}
                variant="light"
                title="Reset zoom"
              >
                <IconZoomReset size="2rem" />
              </ActionIcon>
            </Flex>

            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "500px",
                maxWidth: "100%",
                outline: "1px solid",
                // maxHeight: "calc(100vh - 50px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <Image
                  withPlaceholder
                  placeholder={
                    "Issue with image. Please report issue on Github."
                  }
                  radius="md"
                  width={600}
                  src={mapInfo.imgSrc}
                  alt={mapInfo.imgAlt}
                />
                {hitboxes}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Container>
  );
}

export default Play;
