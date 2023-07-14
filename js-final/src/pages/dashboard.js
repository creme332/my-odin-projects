import { Table } from "@mantine/core";
import HabitRow from "@/components/dashboard/HabitRow";
import { format, sub } from "date-fns";

function getDateLabels() {
  const labels = [];
  const daysInWeek = 7;
  for (let i = 0; i < daysInWeek; i++) {
    labels.push(format(sub(new Date(), { days: i }), "eee d"));
  }
  return labels;
}

export default function Dashboard({ loggedIn, habits, updateHabit }) {
  function getTable() {
    if (!habits) {
      return <div>No habits</div>;
    }
    const rows = habits.map((habit, i) => (
      <HabitRow key={`${habit}-${i}`} habit={habit} updateHabit={updateHabit} />
    ));

    return (
      <Table highlightOnHover>
        <thead>
          <tr>
            <th></th>
            {getDateLabels().map((e, i) => (
              <th key={`currentday-${i}`}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
  return loggedIn ? getTable() : <>Please login to continue.</>;
}
