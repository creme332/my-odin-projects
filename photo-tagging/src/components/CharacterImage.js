import { useMediaQuery } from "@mantine/hooks";
import { Avatar } from "@mantine/core";

function CharacterImage({ avatarImgSrc, avatarImgAlt }) {
  const smallScreen = useMediaQuery("(max-width: 22em)");

  return (
    <Avatar
      size={smallScreen ? "50px" : "100px"}
      src={avatarImgSrc}
      alt={avatarImgAlt}
      color="indigo"
    />
  );
}

export default CharacterImage;
