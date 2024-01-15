import {
  Text,
  Avatar,
  Card,
  Button,
  Flex,
  Spacer,
  Box,
  Center,
} from "@chakra-ui/react";
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
    </div>
  );
}
