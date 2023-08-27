import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Registration({ loggedIn, validateLogin }) {
  const form = useForm({
    initialValues: {
      password: "fddsadsa543sf",
      email: "abc@gmail.com",
      confirmPassword: "fddsadsa543sf",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 5 ? "Password must have at least 5 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container mt={50} size={420}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create a new account
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(() =>
            validateLogin(form.values.email, form.values.password)
          )}
        >
          <TextInput
            label="Email"
            placeholder="me@demo.dev"
            {...form.getInputProps("email")}
            onChange={(e) =>
              form.setValues({
                email: e.target.value,
              })
            }
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            onChange={(e) =>
              form.setValues({
                password: e.target.value,
              })
            }
            {...form.getInputProps("password")}
            required
            mt="md"
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Your password"
            onChange={(e) =>
              form.setValues({
                confirmPassword: e.target.value,
              })
            }
            {...form.getInputProps("confirmPassword")}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
