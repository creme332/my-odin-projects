import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import getInventory from "../utils/cartProvider";
import uniqid from "uniqid";

const ShoppingCart = ({ cart, setCart }) => {
  const inventory = getInventory();

  function updateItemCount(itemID, increment) {
    // increment count
    const newCart = cart.map((prod) => {
      if (prod.id === itemID) {
        const newCount = Math.max(
          0,
          parseInt(prod.count, 10) + (increment ? 1 : -1)
        );
        return { ...prod, count: newCount };
      }
      return prod;
    });

    setCart(newCart);
  }

  function deleteHandler(itemID) {
    const newCart = cart.filter((k) => k.id !== itemID);
    setCart(newCart);
    console.log(itemID, "is deleted");
    console.log(newCart);
  }

  function getTotalPrice() {
    return cart.reduce((accumulator, el) => {
      const itemPrice = inventory.filter((k) => k.id === el.id)[0].price;
      return accumulator + el.count * parseInt(itemPrice);
    }, 0);
  }
  return (
    <Flex direction="column">
      {cart.map((item) => {
        const detailedItem = inventory.filter((k) => k.id === item.id)[0];
        return (
          <Card key={uniqid()} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={detailedItem.imgSrc} height={100} alt={item.imgAlt} />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{detailedItem.title}</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Group position="apart" mt="md">
              <Flex gap="md">
                <Button
                  onClick={() => updateItemCount(item.id, true)}
                  variant="filled"
                  color="blue"
                  mt="md"
                  radius="md"
                >
                  +
                </Button>
                <Button variant="outline" color="blue" mt="md" radius="md">
                  <Text weight={500}>{item.count}</Text>
                </Button>
                <Button
                  onClick={() => updateItemCount(item.id, false)}
                  variant="filled"
                  color="blue"
                  mt="md"
                  radius="md"
                >
                  -
                </Button>
              </Flex>
              <Button
                onClick={() => deleteHandler(item.id)}
                variant="filled"
                color="red"
                mt="md"
                radius="md"
              >
                Remove
              </Button>
            </Group>
          </Card>
        );
      })}
      <Flex justify={"center"}>
        <Button fullWidth variant="filled" color="orange" mt="md" radius="md">
          <Text fz="xl" weight={500}>
            Checkout - Rs {getTotalPrice()}
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default ShoppingCart;
