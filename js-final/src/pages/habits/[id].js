import { useRouter } from "next/router";
import { Container, Group, Button, Title, Code } from "@mantine/core";
import StatsGrid from "@/components/stats/Grid";
import LineChart from "@/components/stats/LineChart";
import { useState } from "react";
import habitCalculator from "@/utils/habitCalculator";

export default function HabitDetailPage({ deleteHabit }) {
  const router = useRouter();
  const [showHabitData, setShowHabitData] = useState(false);
  const habit = JSON.parse(router.query.habit);
  const strengthData = habitCalculator(habit).getStrengthData();
  const statsGridData = [
    {
      title: "Habit strength",
      icon: "barbell",
      value: habitCalculator(habit).getStrength(),
      diff: 34,
      subtext: "Compared to last month",
    },
    {
      title: "Best streak",
      icon: "battery",
      value: habitCalculator(habit).getBestStreak(),
      diff: -13,
      subtext: "",
    },
    {
      title: "Current streak",
      icon: "trees",
      value: habitCalculator(habit).getCurrentStreak(),
      diff: 18,
      subtext: "",
    },
  ];

  /**
   * Redirects user to Edit page where habit details can be edited.
   */
  function goToEditPage() {
    router.push({
      pathname: "/edit",
      query: {
        habit: JSON.stringify(habit),
      },
    });
  }

  return (
    <Container>
      <Title order={1}>{habit.name}</Title>
      <StatsGrid data={statsGridData} />
      <Title order={2}>Score</Title>
      <LineChart
        color={habit.color}
        dataArray={strengthData[0]}
        labelsArray={strengthData[1]}
      />

      <Group>
        <Button mt={20} onClick={goToEditPage} color="blue">
          Edit habit
        </Button>
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
