import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "./../styles/CartButton.module.css";
import ShoppingCart from "./ShoppingCart";
import { Drawer } from "@mantine/core";

const CartButton = ({ drawerOpened, toggleDrawer }) => {
  console.log("dsf:", drawerOpened);

  return (
    <div>
      <div className={styles.shoppingCart} onClick={toggleDrawer.open}>
        <span className={styles.number}>1</span>
        <IconContext.Provider value={{ size: 30 }}>
          <AiOutlineShoppingCart />
        </IconContext.Provider>{" "}
      </div>
      <Drawer
        position="right"
        opened={drawerOpened}
        onClose={toggleDrawer.close}
        title="Shopping Cart"
      >
        <ShoppingCart />
      </Drawer>
    </div>
  );
};

export default CartButton;
