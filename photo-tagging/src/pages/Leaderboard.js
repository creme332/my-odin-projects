import styles from "./../styles/Leaderboard.module.css";
import { Table } from "@mantine/core";

function Leaderboard() {
  const elements = [
    { rank: 1, mass: 12.011, symbol: "C", name: "Carbon" },
    { rank: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { rank: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { rank: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { rank: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.rank}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Leaderboard;
