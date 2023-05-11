import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, List, ThemeIcon, Title } from "@mantine/core";
import {
  IconClockHour9,
  IconScanEye,
  IconTrophyFilled,
  IconHome2,
} from "@tabler/icons-react";

/**
 * Game over screen
 * @param {*} param0 
 * @returns 
 */
function GameScreen({
  time = 500,
  helpCount = 0,
  characterCount = 3,
  difficulty = 2,
  mapName = "Default map",
}) {
  const [opened, { open, close }] = useDisclosure(true);

  /**
   * A simple algorithm that returns a score out of 2000 based on user performance.
   */
  function calculateScore() {
    //Score decreases exponentially the more time player takes to find all characters
    const maxTimeScore = 800;
    const maxHelpScore = 1200;

    const exponent =
      (time - characterCount) / (30 + characterCount * difficulty * 10); // dictates how steep the exponential curve is
    const timeScore = Math.min(
      maxTimeScore,
      parseInt(maxTimeScore * Math.exp(-exponent), 10)
    );
    const helpScore = parseInt(
      maxHelpScore * (1 - Math.min(1, helpCount / Math.max(characterCount, 1)))
    );
    console.log(`${timeScore} + ${helpScore}`);

    return timeScore + helpScore;
  }
  return (
    <>
      <Modal title={mapName} opened={opened} onClose={close} centered>
        <h1>Congratulations 🎉</h1>
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconScanEye size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconClockHour9 size="1rem" />
              </ThemeIcon>
            }
          >
            You took {time} seconds to find {characterCount} characters.{" "}
          </List.Item>
          {helpCount > 0 ? (
            <List.Item>
              You needed help to find {characterCount} characters.
            </List.Item>
          ) : null}
        </List>
        <Title order={4}>Your final score</Title>
        <Title order={1}>{calculateScore()}/2000</Title>
        <Group position="center">
          <Button leftIcon={<IconTrophyFilled />} color="violet">
            View leaderboard
          </Button>
          <Button leftIcon={<IconHome2 />} color="violet">
            Return home
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default GameScreen;
