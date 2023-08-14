import { useRouter } from "next/router";
import { Container, Button, Title } from "@mantine/core";
import StatsGrid from "@/components/stats/Grid";
import LineChart from "@/components/stats/LineChart";

export default function HabitDetailPage({ deleteHabit }) {
  console.log(deleteHabit);
  const { query } = useRouter();
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

      <Button
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
    </Container>
  );
}
