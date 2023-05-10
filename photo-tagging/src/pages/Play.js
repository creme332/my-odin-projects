import { Container } from "@mantine/core";
import React from "react";
import { ActionIcon, Flex, Image } from "@mantine/core";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
import HitBox from "../components/HitBox";
import Character from "../components/Character";
import uniqid from "uniqid";
// const useStyles = createStyles((theme) => ({}));

import { useLocation } from "react-router-dom";
function Play() {
  const mapInfo = useLocation().state;
  const [remainingCharacters, setRemainingCharacters] = useState(
    mapInfo.characters.map((character) => {
      character.found = false;
      return character;
    })
  );

  const hitboxes = mapInfo.characters.map((character) => {
    return (
      <HitBox
        key={uniqid()}
        id={character.id}
        size={character.hitboxRadius}
        topPos={character.topPos}
        leftPos={character.leftPos}
        handleClick={() => handleCorrectClick(character.id)}
      />
    );
  });

  const [transformState, setTransformState] = useState({
    scale: 2,
    positionX: 0,
    positionY: 0,
  }); //zoom scale for map

  function handleTransformation(e) {
    setTransformState(e.instance.transformState);
  }

  function handleCorrectClick(charID) {
    console.log(charID, remainingCharacters);

    // update list of remaining characters
    const newArray = remainingCharacters.filter((char) => char.id !== charID);
    setRemainingCharacters(newArray);
    console.log(remainingCharacters);

    // check if game is over (all characters found)
  }

  return (
    <Container style={{ paddingBottom: "20px" }}>
      {" "}
      <h1>Find characters</h1>
      <TransformWrapper
        initialScale={transformState.scale}
        onTransformed={(e) => handleTransformation(e)}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <React.Fragment>
            <Flex justify="space-around">
              {mapInfo.characters.map((char) => {
                const ids = remainingCharacters.map((c) => c.id);
                return (
                  <Character
                    key={uniqid()}
                    imgSrc={char.imgSrc}
                    found={!ids.includes(char.id)}
                    zoomToCharacter={() => zoomToElement(char.id)}
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
