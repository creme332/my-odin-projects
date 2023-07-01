import { Group, ActionIcon, RingProgress } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { differenceInDays, differenceInWeeks, subDays } from "date-fns";

export default function HabitRow({ habit, updateHabit = null }) {
  const daysSinceCreation = differenceInDays(
    new Date(),
    new Date(habit.dateCreated)
  );
  const currentWeek = parseInt(daysSinceCreation / 7, 10);
  const currentDayOfWeek = daysSinceCreation % 7;
  console.log(currentWeek, currentDayOfWeek);

  // check if data is available for current week
  let currentWeekEntry = habit.weekEntries.filter(
    (entry) => entry.weekNo === currentWeek
  )[0];

  // if week entry missing, initialise new entry
  if (!currentWeekEntry) {
    currentWeekEntry = {
      weekNo: currentWeek,
      firstDayOfWeek: subDays(new Date(), currentDayOfWeek),
      dayEntries: Array(7).fill(habit.automaticSuccess ? true : false),
    };
  }
  console.log(currentWeekEntry);
  const countPass = currentWeekEntry.dayEntries.reduce((sum, el) => {
    return sum + (el ? 1 : 0);
  }, 0);
  console.log(countPass);

  return (
    <tr>
      <td>
        {" "}
        <Group>
          <RingProgress
            size={45}
            thickness={6}
            roundCaps
            sections={[{ value: (100 * countPass) / 7, color: habit.color }]}
          />
          <Link href={"/"}>{habit.name}</Link>
        </Group>
      </td>
      {currentWeekEntry.dayEntries.map((passed, index) => {
        return (
          <td key={`${habit.name} week-${currentWeekEntry} day-${index}`}>
            {passed ? (
              <ActionIcon color="green" variant="subtle">
                <IconCheck size="3.125rem" />
              </ActionIcon>
            ) : (
              <ActionIcon color="red" variant="subtle">
                <IconX size="3.125rem" />
              </ActionIcon>
            )}
          </td>
        );
      })}
    </tr>
  );
}
