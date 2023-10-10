import {
  TextInput,
  PasswordInput,
  Alert,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import FireStoreManager from "@/utils/firestoreManager";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";

export default function Registration({ accessDashboard }) {
  const [hideAccountAlert, setHideAccountAlert] = useState(true);
  const [hideTip, setHideTip] = useState(false);

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 6 ? "Password should be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  async function isAccountDuplicate() {
    const successfulCreation = await FireStoreManager().createNewAccount(
      form.values.email,
      form.values.password
    );
    if (!successfulCreation) {
      setHideAccountAlert(false);
    } else {
      accessDashboard();
    }
  }

  return (
    <Container mt={50} size={450}>
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
        <form onSubmit={form.onSubmit(isAccountDuplicate)}>
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

          {hideTip ? null : (
            <Alert
              mt={10}
              variant="light"
              color="green"
              withCloseButton
              closeButtonLabel="Dismiss"
              onClose={() => {
                setHideTip(true);
              }}
              title="To simply try out the app, go the login page click on the sign in button directly."
              icon={<IconInfoCircle />}
            ></Alert>
          )}

          {hideAccountAlert ? null : (
            <Alert
              mt={10}
              variant="light"
              color="red"
              withCloseButton
              onClose={() => {
                setHideAccountAlert(true);
              }}
              closeButtonLabel="Dismiss"
              title="An error occurred. Read console logs for more details."
              icon={<IconInfoCircle />}
            ></Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
}
