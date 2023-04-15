import CardCSS from "./../styles/Card.module.css";
import { motion } from "framer-motion";
import { Group, Image } from "@mantine/core";
import getBadge from "../utils/cartBadgeProvider";

function Card({ title, price, imgSrc, imgAlt, status }) {
  const noTextDecorationStyle = { textDecoration: "none" };
  return (
    <motion.div whileHover={{ scale: 1.1 }} className={CardCSS.card}>
      <Image
        width={200}
        height={180}
        src={imgSrc}
        alt={imgAlt ? imgAlt : "Image not found"}
        withPlaceholder
      />
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
