import styles from "./../styles/Detail.module.css";
import { useLocation } from "react-router-dom";
import { Button, Image, Text, Box } from "@mantine/core";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Detail({ clickHandler }) {
  const cardInfo = useLocation().state;

  console.log(cardInfo);

  return (
    <div className={styles.detail}>
      <h1 className="defaultH1">{cardInfo.title}</h1>
      <Image
        width={200}
        height={200}
        src={cardInfo.imgSrc}
        alt={cardInfo.imgAlt}
        withPlaceholder
      />
      <Box w={500}>
        {" "}
        <Text fz="lg" lineClamp={4}>
          {cardInfo.description}
        </Text>
      </Box>
      <Button
        leftIcon={<AiOutlineShoppingCart />}
        className="defaultButton"
        loading
      >
        Add to Cart
      </Button>{" "}
    </div>
  );
}

export default Detail;
