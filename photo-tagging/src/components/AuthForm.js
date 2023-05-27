import { Text, Paper, Group, Button } from "@mantine/core";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";

export default function AuthForm({ signIn }) {
  return (
    <Paper w={400} radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to Enigma, login with
      </Text>

      <Group grow mb="md" mt="md">
        <Button
          onClick={signIn}
          variant="outline"
          leftIcon={<IconBrandGoogle />}
        >
          Google
        </Button>
        <Button disabled variant="outline" leftIcon={<IconBrandGithub />}>
          Github
        </Button>
      </Group>
    </Paper>
  );
}
