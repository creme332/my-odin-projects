import { Container, Avatar, Button, Text, Flex, Title } from "@mantine/core";

export default function Profile({ userName = "f" }) {
  return (
    <Container mt={20}>
      <Flex align={"center"}>
        <Avatar
          variant="filled"
          radius="xl"
          size={"xl"}
          src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userName}&backgroundColor=ffdfbf`}
        />
        <Container>
          <Title variant="gradient">Hello {userName}!</Title>
          <Text c="dimmed">
            Welcome to your user account. Here you can change your settings and
            see your statistics.
          </Text>
        </Container>
      </Flex>
      <Title>Statistics</Title>

      <Title>Settings</Title>

      <Button variant="filled" color="red">
        {" "}
        Delete Account
      </Button>
    </Container>
  );
}
