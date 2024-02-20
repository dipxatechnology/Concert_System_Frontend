import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

import { CalendarIcon } from "@chakra-ui/icons";

import { RiSearch2Line } from "react-icons/ri";

import { FaTicket, FaLocationDot } from "react-icons/fa6";

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

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  console.log(filteredEvents);

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
          <CalendarIcon marginRight="10px" boxSize="20px" />
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
      </Flex>
      <Divider margin="15px 0 35px" />
      {filteredEvents.length === 0 && searchQuery && (
        <Text color="#FFFFFF80" fontSize="lg">
          No events found matching "{searchQuery}"
        </Text>
      )}
      <SimpleGrid columns={3} spacing={10} mb="5vh">
        {filteredEvents.map((event) => (
          <Link
            to={`/purchase-details/${event._id}`}
            key={event._id}
            onClick={() => setLoading(true)}
          >
            <Card bg="Foreground" color="white" borderRadius="10px">
              <CardHeader>
                <Text fontWeight="600" fontSize="2xl" color="brand.100">
                  {toTitleCase(event.concert.title)}
                </Text>
              </CardHeader>
              <CardBody>
                <Flex alignItems="center" mt="-20px">
                  <CalendarIcon
                    color="brand.100"
                    boxSize="20px"
                    marginRight="10px"
                  />
                  <Stack spacing="0">
                    <Text>
                      Date: {new Date(event.concert.date).toLocaleDateString()}
                    </Text>
                    <Text color="grey">
                      Time:{" "}
                      {new Date(event.concert.date).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Text>
                  </Stack>
                </Flex>
                <Flex alignItems="center" mt="15px">
                  <Icon
                    color="brand.100"
                    as={FaLocationDot}
                    boxSize="20px"
                    marginRight="10px"
                  />
                  <Text>{toTitleCase(event.concert.venue)}</Text>
                </Flex>
                <Flex alignItems="center" mt="15px">
                  <Icon
                    color="brand.100"
                    as={FaTicket}
                    boxSize="20px"
                    marginRight="10px"
                  />
                  <Text>{event.concert.genre.map(toTitleCase).join(", ")}</Text>
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
                  <Text color="brand.100">{event.status}</Text>
                </Flex>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
}
