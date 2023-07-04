import { Group, ActionIcon, RingProgress, Input } from "@mantine/core";
import { IconCheck, IconX, IconLineDashed } from "@tabler/icons-react";
import Link from "next/link";
import {
  differenceInDays,
  addDays,
  format,
  sub,
} from "date-fns";

/**
 * Automatically fills entries for days where user input is missing.
 * Dates between start date and current date, where current date >= start date, are filled.
 * @param {String} startDate Date when habit started
 * @param {[{date:String, value:integer}]} entryList list of all entries
 * @param {integer} defaultValue
 * @returns {[{date:String, value:integer}]}
 */
function rebalanceEntries(startDate, entryList, defaultValue) {
  const allDateEntries = entryList.map((e) => e.date);
  const daysSinceCreation = differenceInDays(new Date(), new Date(startDate)); // number of days since habit creation
  const newEntryList = [...entryList];

  // if habit starts in the future, do nothing
  if (daysSinceCreation < 0) {
    return entryList;
  }

  for (let day = 0; day <= daysSinceCreation; day++) {
    const date = format(addDays(new Date(startDate), day), "yyyy-MM-dd");
    if (!allDateEntries.includes(date)) {
      newEntryList.push({ date: date, value: defaultValue });
    }
  }

  return newEntryList;
}

/**
 * Returns most recent entries in entryList
 * @param {[{date:String, value:integer}]} entryList list of all entries
 * @param {integer} count Minimum number of entries to return
 * @returns
 */
function getMostRecentEntries(startDate, entryList, count = 7) {
  if (new Date() <= new Date(startDate)) {
    return [];
  }
  const recentEntries = [];
  for (let i = 0; i < count; i++) {
    const date = format(sub(new Date(), { days: i }), "yyyy-MM-dd");
    console.log(date);
    const matchingElement = entryList.filter((e) => e.date === date)[0];
    recentEntries.push(matchingElement);
  }
  console.log(recentEntries);
  return recentEntries;
}

function getHabitInput(habitType, entry) {
  console.log(entry);
  if (habitType === "Boolean") {
    // return icons
    if (entry.value === 1) {
      return (
        <ActionIcon color="green" variant="subtle">
          <IconCheck size="3.125rem" />
        </ActionIcon>
      );
    }

    return (
      <ActionIcon color="red" variant="subtle">
        <IconX size="3.125rem" />
      </ActionIcon>
    );
  }

  if (habitType === "Measurable") {
    // return input box
    return <Input disabled size="xs" w={40} placeholder={entry.value} />;
  }
}

function Ring(recentEntryList, target, color) {
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

export default function HabitRow({ habit, updateHabit = null }) {
  const balancedEntries = rebalanceEntries(
    habit.startDate,
    habit.entries,
    habit.dailyDefault
  );
  const mostRecentEntries = getMostRecentEntries(
    habit.startDate,
    balancedEntries,
    7
  );
  console.log(balancedEntries);
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
