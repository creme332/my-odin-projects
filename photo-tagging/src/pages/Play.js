import { Container } from "@mantine/core";
import React from "react";
import { ActionIcon, Flex } from "@mantine/core";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import img from "../assets/images/maps//marvel-universe/marvel-universe.jpg";
import face from "../assets/images/maps/face.png";
import {
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconHelp,
} from "@tabler/icons-react";
import HitBox from "../components/HitBox";
import Character from "../components/Character";
// const useStyles = createStyles((theme) => ({}));

function Play() {
  const [transformState, setTransformState] = useState({
    scale: 2,
    positionX: 0,
    positionY: 0,
  }); //zoom scale for map

  function handleTransformation(e) {
    setTransformState(e.instance.transformState);
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
              <Character
                imgSrc={face}
                zoomToCharacter={() => zoomToElement("character-element1")}
              />
              <Character imgSrc={face} />
              <Character imgSrc={face} />
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
                maxHeight: "calc(100vh - 50px)",
              }}
            >
              <div
                style={{
                  position: "relative",
                }}
              >
                <img width={600} src={img} alt="test" />

                <HitBox topPos="175px" leftPos="120px" />
                <HitBox topPos="105px" leftPos="50px" />
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Container>
  );
}

export default Play;
