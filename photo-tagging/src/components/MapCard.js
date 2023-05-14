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
import { Link } from "react-router-dom";

function MapCard({ ...cardInfo }) {
  return (
    <Card shadow="xl" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={cardInfo.imgSrc} height={160} alt="Norway" />
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
        <Link state={cardInfo} to={`/play/${cardInfo.title}`}>
          <Button
            variant="filled"
            color="indigo"
            disabled={!cardInfo.available}
          >
            {cardInfo.available ? "Play" : "Coming soon"}
          </Button>
        </Link>
        {cardInfo.available ? (
          <Rating readOnly defaultValue={cardInfo.rating} />
        ) : null}
      </Flex>
    </Card>
  );
}

export default MapCard;
