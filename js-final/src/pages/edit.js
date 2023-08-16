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
import { format } from "date-fns";
import uniqid from "uniqid";
import { useRouter } from "next/router";

export default function Edit({ updateHabit }) {
  const router = useRouter();
  const creatingNewHabit = !router.query.habit;
  console.log("creating new habit = ", creatingNewHabit);

  const defaultHabit = creatingNewHabit
    ? {
        id: uniqid(),
        name: "Learn piano",
        question: "Did you play piano today?",
        notes: "Recommended by doctor",
        type: "Boolean",
        startDate: format(new Date(), "yyyy-MM-dd"),
        color: "cyan",

        target: {
          value: 1,
          unit: "hour",
        },

        schedule: {
          day: 1,
          frequency: 1,
        },

        dailyDefault: 1,
        entries: [],
      }
    : JSON.parse(router.query.habit);

  const form = useForm({
    initialValues: defaultHabit,
  });

  function submitHandler(e) {
    // form.onSubmit(updateHabit(form.values));
    e.preventDefault();
    let habit = form.values;
    const newEntries = rebalanceEntries(
      habit.startDate,
      habit.entries,
      habit.dailyDefault
    );
    updateHabit({
      ...habit,
      entries: newEntries,
    });
    console.log(newEntries);
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
        <form>
          <Stack>
            <NativeSelect
              data={["Boolean", "Measurable"]}
              label="Habit type"
              withAsterisk
              onChange={(e) =>
                form.setValues({
                  type: e.target.value,
                })
              }
            />
            <Group grow>
              <TextInput
                label="Name"
                placeholder={defaultHabit.name}
                onChange={(e) =>
                  form.setValues({
                    name: e.target.value,
                  })
                }
                required
              />
              <ColorInput
                onChange={(e) =>
                  form.setValues({
                    color: e,
                  })
                }
                placeholder={defaultHabit.color}
                label="Color"
              />
            </Group>
            <Group grow>
              <TextInput
                label="Question"
                placeholder={defaultHabit.question}
                onChange={(e) =>
                  form.setValues({
                    question: e.target.value,
                  })
                }
              />
              <DateInput
                placeholder={defaultHabit.startDate}
                onChange={(e) =>
                  form.setValues({
                    startDate: e,
                  })
                }
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
                onChange={(e) =>
                  form.setValues({
                    dailyDefault: e,
                  })
                }
                withAsterisk
              />
              <TextInput
                label="Unit"
                placeholder="hours"
                onChange={(e) =>
                  form.setValues({
                    target: { ...form.values.target, unit: e.target.value },
                  })
                }
              />
            </Group>
            <NumberInput
              placeholder="3 hours"
              label="Target"
              min={1}
              onChange={(e) =>
                form.setValues({
                  target: { ...form.values.target, value: e },
                })
              }
              withAsterisk
            />
            <Group grow>
              <NumberInput
                placeholder="Repeat habit every x days"
                label="Day interval"
                min={1}
                onChange={(e) =>
                  form.setValues({
                    schedule: { ...form.values.schedule, day: e },
                  })
                }
                withAsterisk
              />
              <NumberInput
                min={1}
                placeholder="Number of times to repeat habit during chosen interval"
                label="Frequency"
                withAsterisk
                onChange={(e) =>
                  form.setValues({
                    schedule: { ...form.values.schedule, frequency: e },
                  })
                }
              />
            </Group>
            <Text size={"sm"} color="dimmed">
              {" "}
              Habit will repeat {form.values.schedule.frequency} times every{" "}
              {form.values.schedule.day} days
            </Text>

            <Textarea
              onChange={(e) =>
                form.setValues({
                  notes: e.target.value,
                })
              }
              placeholder="Your comment"
              value={creatingNewHabit ? null : defaultHabit.notes}
              label="Notes"
            />

            <Button
              onClick={submitHandler}
              variant="gradient"
              type="submit"
              fullWidth
              mt="xl"
            >
              {creatingNewHabit ? "Create" : "Edit"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
