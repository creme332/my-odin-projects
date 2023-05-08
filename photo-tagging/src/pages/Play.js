import { Container } from "@mantine/core";
import React from "react";
import { ActionIcon, Flex, Avatar, Indicator } from "@mantine/core";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import img from "../assets/images/maps/marvel-universe.jpg";
import face from "../assets/images/maps/face.png";
import {
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconHelp,
  IconScanEye
} from "@tabler/icons-react";
import HitBox from "../components/HitBox";
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

  function hitCharacter(characterId) {}
  return (
    <Container style={{ paddingBottom: "20px" }}>
      {" "}
      <h1>Find characters</h1>
      <Flex justify="space-around">
        <Indicator
          inline
          size={16}
          offset={7}
          position="bottom-end"
          color="red"
          withBorder
        >
          <Avatar size={100} src={face} alt="it's me" />
          <IconScanEye />
        </Indicator>
        <Indicator
          inline
          size={16}
          offset={7}
          position="bottom-end"
          color="green"
          withBorder
        >
          <Avatar size={100} src="avatar.png" alt="it's me" />
        </Indicator>{" "}
        <Indicator
          inline
          size={16}
          offset={7}
          position="bottom-end"
          color="red"
          withBorder
        >
          <Avatar size={100} src="avatar.png" alt="it's me" />
        </Indicator>
      </Flex>
      <TransformWrapper
        initialScale={transformState.scale}
        onTransformed={(e) => handleTransformation(e)}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, ...rest }) => (
          <React.Fragment>
            <Flex gap={10}>
              <ActionIcon
                color="orange"
                onClick={() => zoomIn()}
                variant="light"
              >
                <IconZoomIn size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => zoomOut()}
                variant="light"
              >
                <IconZoomOut size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="orange"
                onClick={() => resetTransform()}
                variant="light"
              >
                <IconZoomReset size="2rem" />
              </ActionIcon>

              <ActionIcon
                color="blue"
                variant="light"
                onClick={() => zoomToElement("character-element1")}
              >
                <IconHelp size="2rem" />
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
