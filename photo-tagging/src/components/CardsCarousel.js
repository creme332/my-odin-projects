import MapCard from "./MapCard";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme, rem } from "@mantine/core";

export default function CardsCarousel({ data }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <MapCard {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      previousControlLabel="View previous map"
      nextControlLabel="View next map"
      withIndicators
      slideSize="40%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}
