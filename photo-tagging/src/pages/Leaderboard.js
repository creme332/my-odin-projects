import { Container, Flex, Table, Tabs, Loader } from "@mantine/core";
import getAllMaps from "../utils/mapProvider";
import FireStoreManager from "../utils/FireStoreManager";
import { useState, useEffect } from "react";
import dateFormat from "../utils/dateFormat";

function Leaderboard() {
  const mapInfo = getAllMaps().filter((m) => m.available);
  const [gameMapData, setGameMapData] = useState([]);
  const [panelsReady, setPanelsReady] = useState(false);
  const [userNameData, setUserNameData] = useState([]);
  const tabs = mapInfo.map((m) => (
    <Tabs.Tab key={`${m.title}`} value={m.title}>
      {m.title}
    </Tabs.Tab>
  ));

  function getTabPanels() {
    return mapInfo.map((m) => {
      const thisMapData = gameMapData.filter((e) => e.title === m.title)[0];
      if (!thisMapData) return null;
      console.log("hereeee");

      // create rows for table
      const rows = thisMapData.response.map((game, rank) => {
        console.log(userNameData);
        const displayName = userNameData.filter(
          (data) => data.id === game.userID
        )[0].displayName;

        return (
          <tr key={`${game.userID}-${rank}-${m.title}`}>
            <td>{rank + 1}</td>
            <td>{displayName}</td>
            <td>{dateFormat(parseInt(game.duration))}</td>
            <td>{game.score}</td>
          </tr>
        );
      });

      return (
        <Tabs.Panel key={`${m.title}-panel`} value={m.title} pt="xs">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Time</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>{" "}
        </Tabs.Panel>
      );
    });
  }

  useEffect(() => {
    (async () => {
      // fetch games data for each map
      const mapResponses = await Promise.all(
        mapInfo.map(async (m) => {
          const response = await FireStoreManager().getGameDataForMap(m.title);
          return { title: m.title, response: response };
        })
      );
      setGameMapData(mapResponses);

      // create a list of all user ids present in leaderboard
      const ids = [];
      mapResponses.forEach(async (m) => {
        const games = m.response;
        games.forEach((g) => {
          ids.push(g.userID);
        });
      });
      // fetch all display names
      const UserResponses = await Promise.all(
        [...new Set(ids)].map(async (id) => {
          const response = await FireStoreManager().getUsername(false, id);
          return { id: id, displayName: response };
        })
      );
      console.log(UserResponses);

      setUserNameData(UserResponses);

      // display leaderboard data
      setPanelsReady(true);

      console.log("Display tables");
    })();
  }, []);

  return (
    <Container>
      <h1>Leaderboard</h1>
      <Tabs color="violet" variant="outline" defaultValue={mapInfo[0].title}>
        <Tabs.List>{tabs}</Tabs.List>
        {panelsReady ? (
          getTabPanels()
        ) : (
          <Flex h={100} align="center" justify="center">
            <Loader color="cyan" variant="dots" />
          </Flex>
        )}
      </Tabs>
    </Container>
  );
}

export default Leaderboard;
