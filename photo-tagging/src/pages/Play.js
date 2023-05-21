import { Container, ActionIcon, Flex, Image } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
import HitBox from "../components/HitBox";
import Character from "../components/Character";
import uniqid from "uniqid";
import sleep from "../utils/sleep";
import GameScreen from "../components/GameScreen";
import { useLocation } from "react-router-dom";
import shuffle from "../utils/shuffle";
import FireStoreManager from "../utils/FireStoreManager";
function Play() {
  //get information about selected map

  const mapInfo = useLocation().state;
  const maxCharacterCount = 4; // maximum number of characters to be found in a map

  // create a a random character list
  const [characterList, setCharacterList] = useState(
    shuffle([...mapInfo.characters])
      .slice(0, maxCharacterCount)
      .map((character) => {
        character.found = false;
        return character;
      })
  );

  const [zoomAvailable, setZoomAvailable] = useState(true); //zoom to character
  const [helpCount, setHelpCount] = useState(0); //number of times zoom help button is used

  const hitboxes = characterList.map((character) => {
    return (
      <HitBox
        key={uniqid()}
        id={character.id}
        size={character.hitboxRadius}
        topPos={character.topPos}
        leftPos={character.leftPos}
        handleClick={() => updateCharacterStatus(character.id)}
      />
    );
  });

  const [transformState, setTransformState] = useState({
    scale: 2,
    positionX: 0,
    positionY: 0,
  }); //zoom scale for map

  const [startTime, setStartTime] = useState(0); // start time

  useEffect(() => {
    FireStoreManager().incrementGamesStarted();
    setStartTime(Date.now());
    return () => {
      setStartTime(0);
    };
  }, []);

  function endGame() {
    const endTime = Date.now();
    const playerTime = parseInt((endTime - startTime) / 1000, 10);

    return (
      <GameScreen
        difficulty={mapInfo.rating}
        mapName={mapInfo.title}
        helpCount={helpCount}
        characterCount={characterList.length}
        time={playerTime}
      />
    );
  }

  /**
   * Disables zoom to character option temporarily for a set time.
   */
  async function zoomDelay() {
    const seconds = 60;
    setZoomAvailable(false);
    for (let i = 0; i < seconds; i++) {
      await sleep(1000);
    }
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
    // console.log(characterList);
    // console.log(newCharacterList);
    setCharacterList(newCharacterList);
  }

  /**
   * Returns number of characters which have not been found yet
   * @returns {int}
   */
  function getMissingCharCount() {
    return characterList.reduce((sum, el) => sum + (!el.found ? 1 : 0), 0);
  }

  return (
    <Container style={{ paddingBottom: "20px" }}>
      {" "}
      {getMissingCharCount() === 0 ? endGame() : null}
      <h1>Find characters</h1>
      <TransformWrapper
        initialScale={transformState.scale}
        onTransformed={(e) => setTransformState(e.instance.transformState)}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <React.Fragment>
            <Flex mb={35} justify="space-around">
              {characterList.map((char) => {
                return (
                  <Character
                    key={uniqid()}
                    imgSrc={char.imgSrc}
                    imgAlt={char.imgAlt}
                    found={char.found}
                    zoomAvailable={zoomAvailable}
                    zoomToCharacter={() => {
                      setHelpCount(helpCount + 1);
                      zoomToElement(char.id);
                      zoomDelay();
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
                {/* <HitBox
                  key={uniqid()}
                  size={"15px"}
                  topPos={"1680px"}
                  leftPos={"548px"}
                /> */}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Container>
  );
}

export default Play;
