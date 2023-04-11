import CardCSS from "./../styles/Card.module.css";
import { motion } from "framer-motion";
import { Group, Badge } from "@mantine/core";
function Card({ title, price, imgSrc, imgAlt, status }) {
  function getBadge(status) {
    if (status < 0 || status > 2) {
      return (
        <Badge color="black" variant="dot">
          Error
        </Badge>
      );
    }
    const badge_info = {
      0: { color: "teal", text: "On Sale" },
      1: { color: "violet", text: "Limited" },
      2: { color: "pink", text: "Sold" },
    };
    return (
      <Badge color={badge_info[status].color} variant="light">
        {badge_info[status].text}
      </Badge>
    );
  }
  const noTextDecorationStyle = { textDecoration: "none" };
  return (
      <motion.div whileHover={{ scale: 1.1 }} className={CardCSS.card}>
        <img src={imgSrc} alt={imgAlt ? imgAlt : "Image not found"} />
        <div className={CardCSS.cardDesc}>
          <span className={CardCSS.cardTitle}>{title}</span>
          <Group grow>
            <span className={`${CardCSS.price} ${noTextDecorationStyle}`}>
              Rs {parseInt(price)}
            </span>
            {getBadge(parseInt(status))}
          </Group>
        </div>
      </motion.div>
  );
}

export default Card;
