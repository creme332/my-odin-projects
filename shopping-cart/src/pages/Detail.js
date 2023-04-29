import styles from "./../styles/Detail.module.css";
import { useLocation } from "react-router-dom";
import { Button, Image, Text, Box } from "@mantine/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

function Detail({ cart, setCart, toggleDrawer }) {
  const [loading, setLoading] = useState(false); // loading animation for button
  const cardInfo = useLocation().state;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clickHandler = async () => {
    // add loading animation on button for 1s
    setLoading(true);
    await delay(500);
    setLoading(false);

    toggleDrawer.open();
    console.log("clicked");
    //check if product is already in cart
    const isPresent = cart.some((el) => el.id === cardInfo.id);
    if (isPresent) {
      // increment count
      const newCart = cart.map((prod) => {
        if (prod.id === cardInfo.id) {
          return { ...prod, count: prod.count + 1 };
        }
        return prod;
      });
      setCart(newCart);
      console.log(newCart);
    } else {
      // add new product to cart
      const newCart = [].concat(cart, { id: cardInfo.id, count: 1 });
      setCart(newCart);
      console.log(newCart);
    }
  };
  return (
    <div className={styles.detail}>
      <h1 className={`defaultH1 ${styles.defaultH1}`}>{cardInfo.title}</h1>
      <Image
        width={200}
        height={200}
        src={cardInfo.imgSrc}
        alt={cardInfo.imgAlt}
        withPlaceholder
      />
      <Box
        sx={(theme) => ({
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          width: "50%",
        })}
      >
        {" "}
        <Text fz="lg">{cardInfo.description}</Text>
      </Box>
      <Button
        leftIcon={<AiOutlineShoppingCart />}
        className="defaultButton"
        onClick={clickHandler}
        disabled={cardInfo.status === 2}
        loading={loading}
      >
        {cardInfo.status === 2 ? "Sold Out" : "Add to Cart"}
      </Button>{" "}
    </div>
  );
}

export default Detail;
