import { useRouter } from "next/router";
import { Container, Group, Button, Title, Code } from "@mantine/core";
import StatsGrid from "@/components/stats/Grid";
import LineChart from "@/components/stats/LineChart";
import { useState } from "react";

export default function HabitDetailPage({ deleteHabit }) {
  // console.log(deleteHabit);
  const { query } = useRouter();
  const [showHabitData, setShowHabitData] = useState(false);
  const habit = JSON.parse(query.habit);
  const router = useRouter();

  return (
    <Container>
      <Title order={1}>{habit.name}</Title>
      <StatsGrid />
      <Title order={2}>Score</Title>
      <LineChart
        color={habit.color}
        dataArray={[100, 200, 200]}
        labelsArray={["01/02", "01/03", "01/05"]}
      />

      <Group>
        <Button
          mt={20}
          onClick={() => {
            setShowHabitData(!showHabitData);
          }}
          color="orange"
        >
          Export data
        </Button>
        <Button
          mt={20}
          onClick={() => {
            deleteHabit(habit.id);
            router.push({
              pathname: "/dashboard",
            });
          }}
          color="red"
        >
          Delete habit
        </Button>
      </Group>
      {showHabitData ? (
        <Code block>{JSON.stringify(habit, null, 2)}</Code>
      ) : null}
    </Container>
  );
}
