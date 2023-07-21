import { RingProgress } from "@mantine/core";

export default function Ring({ recentEntryList, target, color }) {
  if (recentEntryList.length === 0) {
    return (
      <RingProgress
        size={45}
        thickness={6}
        roundCaps
        sections={[{ value: 0 }]}
      />
    );
  }
  let weeklySuccessCount = recentEntryList.reduce(
    (sum, el) => sum + (el.value >= target ? 1 : 0),
    0
  );
  const weekDays = 7;

  return (
    <RingProgress
      size={45}
      thickness={6}
      roundCaps
      sections={[
        { value: (100 * weeklySuccessCount) / weekDays, color: color },
      ]}
    />
  );
}
