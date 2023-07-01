import { Table } from "@mantine/core";
import HabitRow from "@/components/dashboard/HabitRow";

export default function Dashboard({ loggedIn, habits }) {
  function getTable() {
    const rows = habits.map((habit, i) => (
      <HabitRow key={`${habit}-${i}`} habit={habit} />
    ));

    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            <th>Day 4</th>
            <th>Day 5</th>
            <th>Day 6</th>
            <th>Day 7</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
  return loggedIn ? getTable() : <>Please login to continue.</>;
}
