import { Card, Image, Text, Badge, Button, Group, Flex } from "@mantine/core";

const ShoppingCart = (items) => {
  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Norway Fjord Adventures</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        <Flex gap="md">
          <Button variant="light" color="blue" mt="md" radius="md">
            +
          </Button>
          <Button variant="light" color="blue" mt="md" radius="md">
            -
          </Button>
        </Flex>
      </Card>
    </div>
  );
};

export default ShoppingCart;
