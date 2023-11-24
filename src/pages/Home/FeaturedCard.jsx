import { Heading, Text, Stack, Image, Card } from "@chakra-ui/react";

function FeaturedCard() {
  return (
    <Card
      width={"200px"}
      backgroundColor={"gray.200"}
      p={"0"}
      borderRadius="lg"
    >
      <Image
        m={"0"}
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        width={"200px"}
        src="/src/assets/Rectangle 34.png"
        alt="hero Img"
        borderRadius="lg"
      />
      <Stack mt="3" spacing="1" width={"200px"} pl={"5px"} pb={"5px"}>
        <Heading fontSize="13px">What's new</Heading>
        <Text fontSize="10px">
          Get ready to blast your minds with local artists coming to town.
          Featured artists are Datd Sri Siti Nurhaliza, Yuna, 3p and Joe Flizzow
        </Text>
      </Stack>
    </Card>
  );
}

export default FeaturedCard;
