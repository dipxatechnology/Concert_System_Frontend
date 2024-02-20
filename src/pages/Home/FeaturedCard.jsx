import { Heading, Text, Stack, Image, Card } from "@chakra-ui/react";

function FeaturedCard() {
  return (
    <Card
      width={"300px"}
      backgroundColor={"gray.200"}
      p={"0"}
      borderRadius="lg"
    >
      <Image
        m={"0"}
        objectFit="cover"
        width={"300px"}
        src="/src/assets/Rectangle 34.png"
        alt="hero Img"
        borderRadius="lg"
      />
      <Stack mt="3" spacing="1" padding="0 20px 15px 20px">
        <Heading fontSize="lg">What's new</Heading>
        <Text fontSize="md">
          Get ready to blast your minds with local artists coming to town.
          Featured artists are Datd Sri Siti Nurhaliza, Yuna, 3p and Joe Flizzow
        </Text>
      </Stack>
    </Card>
  );
}

export default FeaturedCard;
