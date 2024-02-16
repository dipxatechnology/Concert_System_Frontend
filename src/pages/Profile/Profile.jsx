import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

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
  Modal,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import {
  RiCalendarEventLine,
  RiSearch2Line,
  RiMapPin2Fill,
  RiFilter2Fill,
} from "react-icons/ri";

import "./profile.css";

export default function Profile({ setLoading, loading }) {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!userProfile && loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const allEvents = userProfile.ticket;
  const filteredEvents = searchQuery
    ? allEvents.filter(
        (event) =>
          event.concert.title &&
          event.concert.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allEvents;

  return (
    <div className="container">
      <Flex>
        <Center>
          <Box>
            <Text as="b" fontSize="5xl">
              {`Welcome back, ${userProfile.username}`}
            </Text>
            <Text color="#FFFFFF80" fontSize="lg">
              Take a look at all of your events.
            </Text>
          </Box>
        </Center>
        <Spacer />
        <Avatar size="2xl" marginRight="5vh" src={userProfile.profile} />
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
          {`Events: ${filteredEvents.length}`}
        </Button>
        <Spacer />
        <InputGroup width="35vh">
          <InputLeftElement pointerEvents="none">
            <Icon as={RiSearch2Line} boxSize="20px" />
          </InputLeftElement>
          <Input
            placeholder="Search ticket"
            fontWeight="600"
            background="#333333"
            marginRight="2vh"
            size="md"
            borderRadius="10px"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <IconButton
          bg="brand.100"
          _hover={{ bg: "brand.200" }}
          fontWeight="bold"
          padding="8px"
          size="md"
          borderRadius="10px"
        >
          {<RiFilter2Fill size="lg" />}
        </IconButton>
      </Flex>
      <Divider margin="15px 0 35px" />
      {filteredEvents.length === 0 && searchQuery && (
        <Text color="#FFFFFF80" fontSize="lg">
          No events found matching "{searchQuery}"
        </Text>
      )}
      <SimpleGrid columns={3} spacing={10}>
        {filteredEvents.map((ticket, index) => (
          <Card key={index} bg="Foreground" color="white" borderRadius="10px">
            <CardHeader>
              <Text fontWeight="600" fontSize="xl">
                {ticket.concert.title}
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
                  <Text>
                    Date: {new Date(ticket.concert.date).toLocaleDateString()}
                  </Text>
                  <Text color="grey">
                    Time: {new Date(ticket.concert.date).toLocaleTimeString()}
                  </Text>
                </Stack>
              </Flex>
              <Flex alignItems="center" mt="15px">
                <Icon as={RiMapPin2Fill} boxSize="20px" marginRight="10px" />
                <Text>{ticket.concert.venue}</Text>
              </Flex>
            </CardBody>
            <Divider color="grey" />
            <CardFooter>
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                width="100%"
              >
                <Text>Ticket Status:</Text>
                <Spacer />
                <Text color="brand.100">{ticket.status}</Text>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
}
