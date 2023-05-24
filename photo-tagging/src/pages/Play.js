import { Container, ActionIcon, Flex, Image } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
import HitBox from "../components/HitBox";
import Character from "../components/Character";
import sleep from "../utils/sleep";
import GameScreen from "../components/GameScreen";
import { useLocation } from "react-router-dom";
import shuffle from "../utils/shuffle";
import FireStoreManager from "../utils/FireStoreManager";
import scoreCalculator from "../utils/scoreCalculator";

function Play() {
  console.log(`Render Play`);

  // Game settings
  const [mapInfo] = useState(useLocation().state); // information about current map
  const maxCharacterCount = 4; // maximum number of characters to be found in a map
  const mapScale = 2; //zoom scale for map
  const zoomSleepDuration = 60; // time interval in seconds between available zooms
  const fsm = FireStoreManager();

  // create a a random character list
  const [characterList, setCharacterList] = useState(
    shuffle([...mapInfo.characters])
      .slice(0, maxCharacterCount)
      .map((character) => {
        character.found = false;
        return character;
      })
  );
  const characterListSize = characterList.length;
  const [zoomAvailable, setZoomAvailable] = useState(true); //zoom to character
  const [helpCount, setHelpCount] = useState(0); //number of times zoom help button is used

  const hitboxes = characterList.map((char) => {
    return (
      <HitBox
        key={`${char.id}-hitbox`}
        id={char.id}
        size={char.hitboxRadius}
        topPos={char.topPos}
        leftPos={char.leftPos}
        handleClick={() => updateCharacterStatus(char.id)}
      />
    );
  });

  const [startTime] = useState(new Date());
  const [showGameScreen, setShowGameScreen] = useState(false);
  const [score, setScore] = useState(0);
  const [gameDuration, setGameDuration] = useState(0);

  useEffect(() => {
    console.log("Game started at ", startTime.toISOString());
    fsm.incrementGamesStarted();
  }, []);

  function endGame() {
    const endTime = new Date();
    console.log("Game ended at ", endTime.toISOString());

    // calculate game duration
    const calculatedGameDuration = parseInt(
      (new Date() - startTime) / 1000,
      10
    );
    setGameDuration(calculatedGameDuration);
    console.log(`Game lasted ${calculatedGameDuration} seconds`);

    // calculate final score
    const finalScore = scoreCalculator(
      calculatedGameDuration,
      characterListSize,
      mapInfo.rating,
      helpCount
    );
    setScore(finalScore);
    console.log(
      calculatedGameDuration,
      characterListSize,
      mapInfo.rating,
      helpCount
    );

    // display game over screen
    setShowGameScreen(true);

    // save game data
    FireStoreManager().handleEndOfGame(
      mapInfo.title,
      calculatedGameDuration,
      characterList.map((c) => c.id),
      helpCount,
      finalScore
    );
  }

  /**
   * Disables zoom to character option temporarily for a set time.
   */
  async function sleepZoom() {
    setZoomAvailable(false);
    await sleep(zoomSleepDuration * 1000);
    setZoomAvailable(true);
  }

  /**
   * Update status of character
   * @param {string} charID id of character clicked on
   */
  function updateCharacterStatus(charID) {
    const clickedCharacter = characterList.filter((c) => charID === c.id)[0];
    if (clickedCharacter.found) return;

    const newCharacterList = characterList.map((c) => {
      if (c.id === charID) {
        return { ...c, found: true };
      }
      return c;
    });

    const remainingCharCount = newCharacterList.reduce(
      (sum, el) => sum + (!el.found ? 1 : 0),
      0
    );

    console.log(`${remainingCharCount} characters left`);
    setCharacterList(newCharacterList);

    if (remainingCharCount === 0) {
      endGame();
    }
  }

  return (
    <Container style={{ paddingBottom: "20px" }}>
      {showGameScreen ? (
        <GameScreen
          difficulty={mapInfo.rating}
          mapName={mapInfo.title}
          helpCount={helpCount}
          characterCount={characterListSize}
          time={gameDuration}
          score={score}
        />
      ) : null}
      <h1>Find characters</h1>
      <TransformWrapper initialScale={mapScale}>
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <React.Fragment>
            <Flex mb={35} justify="space-around">
              {characterList.map((char) => {
                return (
                  <Character
                    key={char.id}
                    imgSrc={char.imgSrc}
                    imgAlt={char.imgAlt}
                    found={char.found}
                    zoomAvailable={zoomAvailable}
                    zoomToCharacter={() => {
                      setHelpCount(helpCount + 1);
                      zoomToElement(char.id);
                      sleepZoom();
                    }}
                  />
                );
              })}
            </Flex>

            <Flex gap={10}>
              <ActionIcon
                color="orange"
                onClick={() => zoomIn()}
                variant="default"
                title="Zoom in"
              >
                <IconZoomIn size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => zoomOut()}
                variant="default"
                title="Zoom out"
              >
                <IconZoomOut size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => resetTransform()}
                variant="default"
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
