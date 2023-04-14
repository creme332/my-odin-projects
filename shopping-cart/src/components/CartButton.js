import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import ShoppingCart from "./ShoppingCart";
import { Drawer, Indicator } from "@mantine/core";

const CartButton = ({ cart, drawerOpened, toggleDrawer }) => {
  const totalCartItems = cart.reduce(
    (accumulator, el) => accumulator + el.count,
    0
  );
  return (
    <div>
      <Indicator
        onClick={toggleDrawer.open}
        offset={6}
        color="orange"
        position="top-end"
        inline
        label={totalCartItems}
        size={18}
      >
        <IconContext.Provider value={{ size: 35 }}>
          <AiOutlineShoppingCart />
        </IconContext.Provider>{" "}
      </Indicator>
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
