import { useState } from "react";
import { ActionIcon, Input, Box } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function HabitCell({
  habitType,
  habitColor,
  entry,
  updateHabitEntry,
}) {
  const [active, setActive] = useState(false);
  const [habitValue, setHabitValue] = useState(entry.value);

  // For boolean habits, return tick/cross icon

  function handleDoubleClick(e) {
    e.preventDefault();
    // if double click
    if (e.detail == 2) {
      console.log("Double clicked");
      // for measurable habits, toggle active
      setActive(!active);

      // for boolean habits, toggle tick
      if (habitType === "Boolean") {
        const newHabitValue = habitValue === 0 ? 1 : 0;
        setHabitValue(newHabitValue);
        updateHabitEntry({ ...entry, value: newHabitValue });
      }
    }
  }

  if (habitType === "Boolean") {
    if (habitValue === 1) {
      return (
        <ActionIcon
          onClick={(e) => handleDoubleClick(e)}
          color={habitColor}
          variant="subtle"
        >
          <IconCheck color={habitColor} size="3.125rem" />
        </ActionIcon>
      );
    }

    return (
      <ActionIcon
        onClick={(e) => handleDoubleClick(e)}
        color={habitColor}
        variant="subtle"
      >
        <IconX color={habitColor} size="3.125rem" />
      </ActionIcon>
    );
  }

  // For measurable habits, return input box
  if (habitType === "Measurable") {
    return (
      <Box onClick={(e) => handleDoubleClick(e)}>
        <Input
          size="xs"
          disabled={!active}
          w={40}
          placeholder={habitValue}
          onChange={(e) => {
            const newHabitValue = parseInt(e.target.value, 10);
            setHabitValue(newHabitValue);
            updateHabitEntry({ ...entry, value: newHabitValue });
          }}
        />
      </Box>
    );
  }
}
