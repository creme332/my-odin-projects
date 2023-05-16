import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { Avatar } from "@mantine/core";

const CharacterImage = memo(function Component({ avatarImgSrc, avatarImgAlt }) {
  const smallScreen = useMediaQuery("(max-width: 22em)");

  return (
    <Avatar
      size={smallScreen ? "50px" : "100px"}
      src={avatarImgSrc}
      alt={avatarImgAlt}
      color="indigo"
    />
  );
});

export default CharacterImage;
