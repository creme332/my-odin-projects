import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Drawer, Indicator } from "@mantine/core";

const CartButton = ({
  totalCartItems,
  drawerOpened,
  toggleDrawer,
  drawerChildren,
}) => {
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
        title="Your items"
      >
        {drawerChildren}
      </Drawer>
    </div>
  );
};

export default CartButton;
