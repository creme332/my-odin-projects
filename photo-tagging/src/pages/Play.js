import styles from "./../styles/Play.module.css";
import { Container } from "@mantine/core";
import React, { Component } from "react";
import { ActionIcon, Flex } from "@mantine/core";
import {
  TransformWrapper,
  TransformComponent,
  KeepScale,
} from "react-zoom-pan-pinch";
import img from "../assets/images/maps/rod-hunt-party.jpg";
import { IconZoomIn, IconZoomOut, IconZoomReset } from "@tabler/icons-react";
function Play() {
  return (
    <Container>
      {" "}
      <TransformWrapper
        initialScale={1}
        // initialPositionX={200}
        // initialPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <Flex gap={10}>
              <ActionIcon onClick={() => zoomIn()} variant="filled">
                <IconZoomIn size="2rem" />
              </ActionIcon>
              <ActionIcon onClick={() => zoomOut()} variant="filled">
                <IconZoomOut size="2rem" />
              </ActionIcon>
              <ActionIcon onClick={() => resetTransform()} variant="filled">
                <IconZoomReset size="2rem" />
              </ActionIcon>
            </Flex>
            <TransformComponent
              wrapperStyle={{
                width: "700px",
                height: "500px",
                maxWidth: "100%",
                maxHeight: "calc(100vh - 50px)",
              }}
            >
              <Container
                style={{
                  position: "relative",
                  background: "#999",
                }}
              >
                <img width={600} src={img} alt="test" />
                <div
                  style={{
                    position: "absolute",
                    top: "190px",
                    left: "116px",
                    // transform: "translate(-50%, -50%)",
                    zIndex: 2,
                    // marginLeft: "-200px",
                  }}
                >
                  {/* <KeepScale>
                    <div className={styles.tag}></div>
                  </KeepScale> */}
                  <div className={styles.tag}></div>
                </div>
              </Container>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Container>
  );
}

export default Play;
