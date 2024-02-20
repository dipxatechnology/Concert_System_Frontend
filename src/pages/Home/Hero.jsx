import { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import FeaturedCard from "./FeaturedCard";
import { Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Hero({ loggedIn }) {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 2, md: 5 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              color={"white"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
            >
              Book tickets anywhere, all in
            </Text>

            <Text as={"span"} color={"red.400"}>
              {" "}
              one place
            </Text>
          </Heading>
          <Text color={"gray.500"}>Current Event</Text>
          <FeaturedCard />
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              width={"300px"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              rightIcon={<ArrowForwardIcon h={4} w={4} color={"white"} />}
              colorScheme="red"
            >
              How It Works
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"400px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={"/src/assets/Group 16.png"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
