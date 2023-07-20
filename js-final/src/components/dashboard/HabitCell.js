import { useState } from "react";
import { ActionIcon, Input, Box } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function HabitCell({
  habitType,
  entry,
  updateHabitEntry = null,
}) {
  console.log(entry);
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
      console.log(active);

      // for boolean habits, toggle tick
      if (habitType === "Boolean") {
        setHabitValue(habitValue === 0 ? 1 : 0);
      }
    }
  }

  if (habitType === "Boolean") {
    if (habitValue === 1) {
      return (
        <ActionIcon
          onClick={(e) => handleDoubleClick(e)}
          color="green"
          variant="subtle"
        >
          <IconCheck size="3.125rem" />
        </ActionIcon>
      );
    }

    return (
      <ActionIcon
        onClick={(e) => handleDoubleClick(e)}
        color="red"
        variant="subtle"
      >
        <IconX size="3.125rem" />
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
            setHabitValue(e.target.value);
          }}
        />
      </Box>
    );
  }
}
