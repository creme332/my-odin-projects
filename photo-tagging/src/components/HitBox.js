import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, { size, topPos, leftPos }) => ({
  hbContainer: {
    position: "absolute",
    top: topPos,
    left: leftPos,
    zIndex: 2,
  },
  hb: {
    position: "absolute",
    // outline: "3px dotted red",
    // backgroundColor: "violet",
    height: size,
    width: size,
    borderRadius: "50%",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

/**
 * Hitbox of a character on map
 */
export default function HitBox({
  size = "20px",
  topPos = 0,
  leftPos = 0,
  id,
  handleClick,
}) {
  const { classes } = useStyles({ size, topPos, leftPos });
  return (
    <div className={classes.hbContainer}>
      <div id={id} onClick={handleClick} className={classes.hb}></div>
    </div>
  );
}
