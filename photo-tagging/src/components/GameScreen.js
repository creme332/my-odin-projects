import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  List,
  ThemeIcon,
  Title,
  Container,
} from "@mantine/core";
import {
  IconClockHour9,
  IconScanEye,
  IconTrophyFilled,
  IconHome2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

/**
 * Game over screen
 * @param {int} time Time taken by player to find all characters
 * @param {int} helpCount Number of times player used help button
 * @param {int} characterCount Number of characters in map 
 * @param {int} difficulty A number 1-5 where 5 is hardest
 * @param {int} mapName

 * @returns
 */
function GameScreen({
  time = 500,
  helpCount = 1,
  characterCount = 3,
  difficulty = 2,
  mapName = "Default map",
  score = 0,
}) {
  const [opened, toggle] = useDisclosure(true);
  const navigate = useNavigate();

  return (
    <>
      <Modal title={mapName} opened={opened} onClose={toggle.close} centered>
        <Container>
          <Title mb={20} order={1}>
            Congratulations 🎉
          </Title>
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
              You took {time} seconds to find {characterCount}
              {characterCount > 1 ? " characters" : " character"}.
            </List.Item>
            {helpCount > 0 ? (
              <List.Item>
                You needed help {helpCount}
                {helpCount > 1 ? " times" : " time"}.
              </List.Item>
            ) : null}
          </List>
          <Group>
            <Title order={4}>Your score:</Title>
            <Title order={2}>{score}/2000</Title>
          </Group>
        </Container>

        <Group mt={20} position="center">
          <Button
            onClick={() => navigate("/leaderboard")}
            leftIcon={<IconTrophyFilled />}
            color="violet"
          >
            View leaderboard
          </Button>
          <Button
            onClick={() => navigate("/")}
            leftIcon={<IconHome2 />}
            color="violet"
          >
            Return home
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default GameScreen;
