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
  SimpleGrid,
  CardHeader,
  CardFooter,
  CardBody,
  Stack,
} from "@chakra-ui/react";

import {
  RiCalendarEventLine,
  RiSearch2Line,
  RiMapPin2Fill,
} from "react-icons/ri";

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
          padding="10px"
          marginRight="8px"
          size="sm"
        >
          <Icon as={RiSearch2Line} marginRight="10px" boxSize="20px" />
          Search ticket
        </Button>
      </Flex>
      <Divider margin="15px 0 35px" />
      <SimpleGrid columns={3} spacing={10}>
        {/*Sample for card*/}
        <Card bg="Foreground" color="white">
          <CardHeader>
            <Text fontWeight="600" fontSize="xl">
              Client Report
            </Text>
          </CardHeader>
          <CardBody>
            <Flex alignItems="center">
              <Icon
                as={RiCalendarEventLine}
                boxSize="20px"
                marginRight="10px"
              />
              <Stack spacing="0">
                <Text>Date</Text>
                <Text color="grey">Time</Text>
              </Stack>
            </Flex>
            <Flex alignItems="center" mt="15px">
              <Icon as={RiMapPin2Fill} boxSize="20px" marginRight="10px" />
              <Text>Location</Text>
            </Flex>
          </CardBody>
          <Divider color="grey" />
          <CardFooter>
            <Flex justifyContent="center" alignItems="center" width="100%">
              <Text color="brand.100">Ola</Text>
            </Flex>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </div>
  );
}
