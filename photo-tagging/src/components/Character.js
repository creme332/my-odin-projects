import { Flex, ActionIcon } from "@mantine/core";
import { IconScanEye, IconCircleCheckFilled } from "@tabler/icons-react";
import CharacterImage from "./CharacterImage";

export default function Character({
  imgSrc,
  imgAlt,
  zoomToCharacter,
  found = false,
  zoomAvailable = true,
}) {
  return (
    <Flex direction={"column"} gap={10}>
      <CharacterImage avatarImgAlt={imgAlt} avatarImgSrc={imgSrc} />
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
