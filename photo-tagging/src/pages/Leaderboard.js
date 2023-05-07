import styles from "./../styles/Leaderboard.module.css";
import { Container, Pagination, Table } from "@mantine/core";

function Leaderboard() {
  const elements = [
    { rank: 1, mass: "Global", symbol: "2:32", name: "Carbon" },
    { rank: 2, mass: "France", symbol: "3:21", name: "Nitrogen" },
    { rank: 3, mass: "Turkey", symbol: "6:52", name: "Yttrium" },
    { rank: 4, mass: "India", symbol: "10:32", name: "Barium" },
    { rank: 5, mass: "China", symbol: "20:42", name: "Cerium" },
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
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Time</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination total={10} />
    </Container>
  );
}

export default Leaderboard;
