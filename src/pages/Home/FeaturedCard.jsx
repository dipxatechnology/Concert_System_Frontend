import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Card,
  CardBody,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

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
