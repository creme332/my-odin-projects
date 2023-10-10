import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Anchor,
  Text,
} from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import FireStoreManager from "@/utils/firestoreManager";

export default function LoginForm({ accessDashboard }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("fddsadsa543sf");
  const [displayError, setDisplayError] = useState(false);

  async function onSubmit() {
    const isValid = await FireStoreManager().signIn(email, password);
    console.log("Valid login? ", isValid);
    if (isValid) {
      // sign in then redirect to dashboard
      accessDashboard();
    } else {
      setDisplayError(true);
    }
  }

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
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Link href={"/account/register"}>
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>
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
        <Button onClick={onSubmit} fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
