import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Rating,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function MapCard({ ...cardInfo }) {
  const navigate = useNavigate();

  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          withPlaceholder
          src={cardInfo.imgSrc}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text fz="lg" weight={600}>
          {cardInfo.title}
        </Text>
        <Badge color="pink" variant="light">
          {cardInfo.category}{" "}
        </Badge>
      </Group>

      <Flex
        align="center"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <Button
          variant="filled"
          color="indigo"
          onClick={() =>
            navigate(`/play/${cardInfo.title}`, { state: cardInfo })
          }
          disabled={!cardInfo.available}
        >
          {cardInfo.available ? "Play" : "Coming soon"}
        </Button>
        {cardInfo.available ? (
          <Rating readOnly defaultValue={cardInfo.rating} />
        ) : null}
      </Flex>
    </Card>
  );
}

export default MapCard;
