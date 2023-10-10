import {
  TextInput,
  NumberInput,
  Paper,
  Title,
  Container,
  ColorInput,
  Button,
  NativeSelect,
  Text,
  Textarea,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import rebalanceEntries from "@/utils/rebalance";
import uniqid from "uniqid";
import { useRouter } from "next/router";
import { format } from "date-fns";

export default function Edit({ accessDashboard, updateHabit }) {
  const router = useRouter();
  const creatingNewHabit = !router.query.habit;
  console.log("Creating new habit? ", creatingNewHabit);

  /**
   * Returns the habit to be displayed on the form.
   *
   * Note that the form can be used to edit a habit or create a new one.
   * If form is in editing mode, the form will be filled with details of habit to be edited.
   * @returns {Object}
   */
  function getInitialHabit() {
    if (creatingNewHabit) {
      return {
        id: uniqid(),
        name: "",
        question: "",
        notes: "",
        type: "Measurable",
        startDate: "",
        color: "",

        target: {
          value: 1,
          unit: "",
        },

        schedule: {
          day: 1,
          frequency: 1,
        },

        dailyDefault: 0,
        entries: [],
      };
    }

    // get habit to be displayed
    const x = JSON.parse(router.query.habit);

    // convert startDate to a date object which can be displayed on the form
    x.startDate = new Date(x.startDate);
    return x;
  }

  const defaultHabit = getInitialHabit();

  console.log("Default habit: ", defaultHabit);

  const form = useForm({
    initialValues: defaultHabit,

    validate: {
      name: (value) =>
        value.length < 4 ? "Name must have at least 4 characters" : null,
      type: (value) =>
        value !== "Boolean" && value !== "Measurable"
          ? "Invalid habit type"
          : null,
    },

    transformValues: (values) => ({
      ...values,
      startDate:
        values.startDate instanceof Date
          ? format(values.startDate, "yyyy-MM-dd")
          : values.startDate, // ensure that start date has string format
      entries: rebalanceEntries(
        values.startDate,
        values.entries,
        values.dailyDefault
      ), // initialize entries
    }),
  });

  function formatFrequencyMessage(frequency, dayFrequency) {
    const frequencyList = ["once", "twice", "thrice"];
    const message = `Habit will repeat ${
      frequency - 1 < 3 ? frequencyList[frequency - 1] : `${frequency} times`
    } ${dayFrequency === 1 ? "daily" : ` every ${dayFrequency} days`}`;
    return message;
  }

  function submitHandler(habit) {
    updateHabit(habit);
    accessDashboard();
  }

  return (
    <Container mt={50}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {creatingNewHabit ? "Create habit" : "Edit habit"}
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(submitHandler)}>
          <Stack>
            <NativeSelect
              data={["Boolean", "Measurable"]}
              label="Habit type"
              withAsterisk
              {...form.getInputProps("type")}
            />
            <Group grow>
              <TextInput
                label="Name"
                placeholder={"Learn piano"}
                {...form.getInputProps("name")}
                required
              />
              <ColorInput
                {...form.getInputProps("color")}
                placeholder="Choose a color"
                label="Color"
                required
              />
            </Group>
            <Group grow>
              <TextInput
                label="Question"
                placeholder={"Did you play piano today?"}
                {...form.getInputProps("question")}
              />
              <DateInput
                {...form.getInputProps("startDate")}
                placeholder="When to start tracking habit"
                label="Start date"
                required
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Default daily value"
                min={0}
                max={form.values.type === "Boolean" ? 1 : null}
                placeholder="Which value to set automatically"
                {...form.getInputProps("dailyDefault")}
                withAsterisk
              />
              <TextInput
                label="Unit"
                placeholder="hours"
                {...form.getInputProps("target.unit")}
              />
            </Group>
            {form.values.type === "Boolean" ? (
              <Text size={"sm"} color="dimmed">
                For boolean habits, 1 means success and 0 means failure.
              </Text>
            ) : null}

            <NumberInput
              placeholder="3 hours"
              label="Target"
              max={form.values.type === "Boolean" ? 1 : null}
              min={0}
              {...form.getInputProps("target.value")}
              withAsterisk
            />
            <Group grow>
              <NumberInput
                placeholder="Repeat habit every x days"
                label="Day interval"
                min={1}
                {...form.getInputProps("schedule.day")}
                withAsterisk
              />
              <NumberInput
                min={1}
                placeholder="Number of times to repeat habit during chosen interval"
                label="Frequency"
                withAsterisk
                {...form.getInputProps("schedule.frequency")}
              />
            </Group>
            <Text size={"sm"} color="dimmed">
              {" "}
              {formatFrequencyMessage(
                form.values.schedule.frequency,
                form.values.schedule.day
              )}
            </Text>

            <Textarea
              {...form.getInputProps("notes")}
              placeholder="Piano is good for health"
              label="Notes"
            />

            <Button variant="gradient" type="submit" fullWidth mt="xl">
              {creatingNewHabit ? "Create" : "Edit"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
