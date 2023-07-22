import { Group } from "@mantine/core";
import Link from "next/link";
import { format, sub } from "date-fns";
import HabitCell from "./HabitCell";
import Ring from "./Ring";
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

export default function HabitRow({ habit, updateHabit }) {
  const mostRecentEntries = getMostRecentEntries(habit.entries);

  function updateHabitEntry(newEntry) {
    const idx = habit.entries.findIndex(({ date }) => date === newEntry.date);
    const newEntryList = [...habit.entries];
    newEntryList[idx] = newEntry;
    updateHabit({ ...habit, entries: newEntryList });
  }

  return (
    <tr>
      <td>
        {" "}
        <Group>
          <Ring
            recentEntryList={mostRecentEntries}
            target={habit.target.value}
            color={habit.color}
          />
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
              updateHabitEntry={updateHabitEntry}
            />
          </td>
        );
      })}
    </tr>
  );
}
