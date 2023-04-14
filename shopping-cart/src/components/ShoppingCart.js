import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";
import getInventory from "../cartProvider";

const ShoppingCart = () => {
  const items = getInventory();
  return (
    <div>
      {items.map((item) => {
        return (
          <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={item.imgSrc} height={100} alt={item.imgAlt} />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Group position="apart" mt="md">
              <Flex gap="md">
                <Button variant="filled" color="blue" mt="md" radius="md">
                  +
                </Button>
                <Text weight={500}>5</Text>
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
        <Button variant="filled" color="orange" mt="md" radius="md">
          Checkout
        </Button>
      </Flex>
    </div>
  );
};

export default ShoppingCart;
