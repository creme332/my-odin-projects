import styles from "./../styles/Play.module.css";
import { Container } from "@mantine/core";
import React, { Component } from "react";
import {
  ActionIcon,
  Flex,
  createStyles,
  Avatar,
  Indicator,
} from "@mantine/core";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import img from "../assets/images/maps/anime-party.jpg";
import {
  IconZoomIn,
  IconZoomOut,
  IconZoomReset,
  IconHelp,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({}));

function Play() {
  function getClickCoordinates(e) {
    console.log("client: ", e.clientX, e.clientY);
    console.log("offset: ", e.offsetX, e.offsetY);
    console.log("page: ", e.pageX, e.pageY);
  }
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
          <Avatar size={100} src="avatar.png" alt="it's me" />
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
      <TransformWrapper initialScale={1} centerOnInit>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
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

              <ActionIcon color="blue" variant="light">
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
                onClick={(e) => getClickCoordinates(e)}
              >
                <img width={600} src={img} alt="test" />
                <div
                  style={{
                    position: "absolute",
                    top: "190px",
                    left: "116px",
                    zIndex: 2,
                  }}
                >
                  <div className={styles.tag}></div>
                </div>
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Container>
  );
}

export default Play;
