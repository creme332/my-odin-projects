import { Group, ActionIcon, RingProgress, Input } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { differenceInDays, addDays, format, sub } from "date-fns";

/**
 * Returns most recent entries in entryList
 * @param {[{date:String, value:integer}]} entryList list of all entries
 * @param {integer} count Minimum number of entries to return
 * @returns
 */
function getMostRecentEntries(entryList, count = 7) {
  const recentEntries = [];
  for (let i = 0; i < count; i++) {
    const date = format(sub(new Date(), { days: i }), "yyyy-MM-dd");
    const matchingElement = entryList.filter((e) => e.date === date)[0];
    recentEntries.push(matchingElement);
  }
  return recentEntries;
}

function getHabitInput(habitType, entry) {
  // console.log(entry);
  if (habitType === "Boolean") {
    // return icons

    // if boolean value is 1, put a tick
    if (entry.value === 1) {
      return (
        <ActionIcon color="green" variant="subtle">
          <IconCheck size="3.125rem" />
        </ActionIcon>
      );
    }

    // if boolean value is 0, put a cross
    return (
      <ActionIcon color="red" variant="subtle">
        <IconX size="3.125rem" />
      </ActionIcon>
    );
  }

  if (habitType === "Measurable") {
    // return input box
    return <Input size="xs" w={40} placeholder={entry.value} />;
  }
}

function Ring(recentEntryList, target, color) {
  // console.log(recentEntryList);
  if (recentEntryList.length === 0) {
    return (
      <RingProgress
        size={45}
        thickness={6}
        roundCaps
        sections={[{ value: 0 }]}
      />
    );
  }
  let weeklySuccessCount = recentEntryList.reduce(
    (sum, el) => sum + (el.value >= target ? 1 : 0),
    0
  );
  const weekDays = 7;

  return (
    <RingProgress
      size={45}
      thickness={6}
      roundCaps
      sections={[
        { value: (100 * weeklySuccessCount) / weekDays, color: color },
      ]}
    />
  );
}

export default function HabitRow({ habit }) {
  const mostRecentEntries = getMostRecentEntries(habit.entries);
  return (
    <tr>
      <td>
        {" "}
        <Group>
          {Ring(mostRecentEntries, habit.target.value, habit.color)}
          <Link style={{ textDecoration: "none" }} href={"/"}>
            {habit.name}
          </Link>
        </Group>
      </td>
      {mostRecentEntries.map((entry, index) => {
        return (
          <td key={`${habit.name}-${habit.id}-input day-${index}`}>
            {getHabitInput(habit.type, entry)}
          </td>
        );
      })}
    </tr>
  );
}
