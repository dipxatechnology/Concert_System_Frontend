import {
  Text,
  Avatar,
  Card,
  Button,
  Flex,
  Spacer,
  Box,
  Center,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { RiCalendarEventLine, RiSearch2Line } from "react-icons/ri";

import "./profile.css";

export default function Profile() {
  return (
    <div className="container">
      <Flex>
        <Center>
          <Box>
            <Text as="b" fontSize="5xl">
              Welcome back, User
            </Text>
            <Text color="#FFFFFF80" fontSize="lg">
              Take a look at all of your events.
            </Text>
          </Box>
        </Center>
        <Spacer />
        <Avatar size="2xl" marginRight="5vh" />
      </Flex>
      <Flex marginTop="5vh">
        <Button
          size="lg"
          bg="brand.100"
          _hover={{ bg: "brand.200" }}
          fontWeight="bold"
          width="15rem"
          borderRadius="10px"
          justifyContent="left"
          fontSize="18px"
        >
          <Icon as={RiCalendarEventLine} marginRight="10px" boxSize="20px" />
          Events:
        </Button>
        <Spacer />
        <Button
          bg="brand.100"
          _hover={{ bg: "brand.200" }}
          fontWeight="bold"
          borderRadius="10px"
          width="11rem"
          marginRight="8px"
        >
          <Icon as={RiSearch2Line} marginRight="10px" boxSize="20px" />
          Search ticket
        </Button>
      </Flex>
      <Divider margin="3vh 0 6vh 0" />
    </div>
  );
}
