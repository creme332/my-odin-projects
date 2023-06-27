import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";

export default function LoginForm({ validateLogin }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [displayError, setDisplayError] = useState(false);

  return (
    <Container mt={50} size={420}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="me@demo.dev"
          onChange={(e) => setEmail(e.target.value)}
          required
          error={displayError}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          error={displayError}
          mt="md"
        />
        <Button
          onClick={() => {
            const isValid = validateLogin(email, password);
            setDisplayError(!isValid);
          }}
          fullWidth
          mt="xl"
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
