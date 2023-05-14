import { Flex, Avatar, ActionIcon } from "@mantine/core";
import { IconScanEye, IconCircleCheckFilled } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

export default function Character({
  imgSrc,
  zoomToCharacter,
  found = false,
  zoomAvailable = true,
}) {
  const smallScreen = useMediaQuery("(max-width: 22em)");

  return (
    <Flex direction={"column"} gap={10}>
      <Avatar
        size={smallScreen ? "50px" : "100px"}
        src={imgSrc}
        alt="Character to be found on map"
        color="indigo"
      />
      <Flex align={"center"} justify={"space-between"}>
        <ActionIcon
          onClick={zoomToCharacter}
          title="Zoom to character"
          color="black"
          variant="default"
          disabled={!zoomAvailable}
        >
          <IconScanEye size="1.5rem" />
        </ActionIcon>

        {found ? (
          <IconCircleCheckFilled style={{ color: "teal" }} />
        ) : (
          <IconCircleCheckFilled style={{ color: "red" }} />
        )}
      </Flex>
    </Flex>
  );
}
