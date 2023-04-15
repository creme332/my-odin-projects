import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import getInventory from "../utils/cartProvider";

const ShoppingCart = ({ cart }) => {
  const inventory = getInventory();
  console.log(cart);
  function getTotalPrice() {
    return cart.reduce(
      (accumulator, el) => {
        const itemPrice = inventory.filter(k => k.id === el.id)[0].price;
        return accumulator + el.count * parseInt(itemPrice)
      },
      0
    );
  }
  return (
    <div>
      {cart.map((item) => {
        const detailedItem = inventory.filter(k => k.id === item.id)[0];
        console.log(detailedItem);
        return (
          <Card key={detailedItem.id} shadow="sm" padding="lg" radius="md" withBorder>
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
              <Flex gap="md" >
                <Button variant="filled" color="blue" mt="md" radius="md">
                  +
                </Button>
                <Button variant="outline" color="blue" mt="md" radius="md">
                  <Text weight={500}>{item.count}</Text>

                </Button>
                <Button variant="filled" color="blue" mt="md" radius="md">
                  -
                </Button>
              </Flex>
              <Button variant="filled" color="red" mt="md" radius="md">
                Remove
              </Button>
            </Group>
          </Card>
        );
      })}
      <Flex justify={"center"}>
        <Button fullWidth variant="filled" color="orange" mt="md" radius="md">
          <Text fz="xl"
            weight={500}>Checkout - Rs {getTotalPrice()}</Text>
        </Button>
      </Flex>
    </div>
  );
};

export default ShoppingCart;
