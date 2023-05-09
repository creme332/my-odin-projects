import { Flex, Avatar, Badge, ActionIcon } from "@mantine/core";
import { IconScanEye } from "@tabler/icons-react";

export default function Character({ imgSrc, zoomToCharacter }) {
  return (
    <Flex direction={"column"} gap={10}>
      <Avatar size={100} src={imgSrc} alt="Character to be found on map" />
      <Flex align={"center"} justify={"space-between"}>
        <ActionIcon
          onClick={zoomToCharacter}
          title="Zoom to character"
          color="black"
          variant="default"
        >
          <IconScanEye size="rem" />
        </ActionIcon>
        <Badge color="red">Missing</Badge>
      </Flex>
    </Flex>
  );
}
