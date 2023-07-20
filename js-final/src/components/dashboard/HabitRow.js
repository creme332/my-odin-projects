import { Group, RingProgress } from "@mantine/core";
import Link from "next/link";
import { format, sub } from "date-fns";
import HabitCell from "./HabitCell";
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

export default function HabitRow({ habit, updateHabit }) {
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
            <HabitCell
              habitType={habit.type}
              entry={entry}
              updateHabit={updateHabit}
            />
          </td>
        );
      })}
    </tr>
  );
}
