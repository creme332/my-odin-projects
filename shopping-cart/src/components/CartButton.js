import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "./../styles/CartButton.module.css";
import { useDisclosure } from "@mantine/hooks";
import ShoppingCart from "./ShoppingCart";
import { Drawer } from "@mantine/core";

const CartButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <div className={styles.shoppingCart} onClick={open}>
        <span className={styles.number}>1</span>
        <IconContext.Provider value={{ size: 30 }}>
          <AiOutlineShoppingCart />
        </IconContext.Provider>{" "}
      </div>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Shopping Cart"
      >
        <ShoppingCart/>
      </Drawer>
    </div>
  );
};

export default CartButton;
