import {
  Group,
  ActionIcon,
  Paper,
  RingProgress,
  Text,
  Table,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
export default function Dashboard({ loggedIn }) {
  function getTable() {
    const elements = [
      { name: "Quit x", day1: "y", day2: "y", day3: "y", day4: "y", day5: "y" },
      {
        name: "Do 100 push-ups",
        day1: "y",
        day2: "y",
        day3: "y",
        day4: "y",
        day5: "y",
      },
    ];
    const rows = elements.map((habit) => (
      <tr key={habit.name}>
        <td>
          {" "}
          <Group>
            <RingProgress
              size={45}
              thickness={6}
              roundCaps
              sections={[{ value: 40, color: "cyan" }]}
            />
            <Link href={"/"}>{habit.name}</Link>
          </Group>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="red" variant="subtle">
            <IconX size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
        <td>
          {" "}
          <ActionIcon color="green" variant="subtle">
            <IconCheck size="3.125rem" />
          </ActionIcon>
        </td>
      </tr>
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
  return loggedIn ? getTable() : <>Please login to continue</>;
}
