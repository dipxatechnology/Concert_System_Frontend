import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Text,
  Stack,
  Image,
  Card,
  CardBody,
  Divider,
  SimpleGrid,
  Icon,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaTicket, FaLocationDot } from "react-icons/fa6";
import "./events.css";
import api from "../../api/api";

export default function Events({ setLoading, loading }) {
  const [error, setError] = useState(null);
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get("/concerts");
        setConcerts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="event-style">
      <Heading as="h1" size="2xl" margin="20px 0">
        All Events
      </Heading>
      <SimpleGrid columns={3} spacing={10}>
        {concerts.map((concert) => (
          <Link
            to={`/events/${concert._id}`}
            key={concert._id}
            onClick={() => setLoading(true)}
          >
            <Card
              color="white"
              borderRadius="xl"
              height="auto"
              width="auto"
              bg="rgba(85, 85, 85, 0.5)"
              marginTop="5vh"
            >
              <CardBody>
                <Stack mt="3" textAlign="center" align="center">
                  <Image
                    boxSize="350px"
                    objectFit="cover"
                    fit="contain"
                    src={concert.profile}
                    alt={concert.title}
                    borderRadius="xl"
                  />
                  <Divider mt="5" borderWidth="1px" />
                  <Text fontSize="2xl" color="#D45161">
                    {concert.title}
                  </Text>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    marginTop="5px"
                    maxWidth="80%"
                  >
                    <Icon
                      as={FaLocationDot}
                      color="brand.100"
                      boxSize="20px"
                      marginRight="5px"
                    />
                    <Text>
                      {toTitleCase(concert.venue)}, {toTitleCase(concert.city)},{" "}
                      {toTitleCase(concert.state)},{" "}
                      {toTitleCase(concert.country)}
                    </Text>
                  </Flex>

                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    marginTop="5px"
                  >
                    <CalendarIcon
                      color="brand.100"
                      boxSize="20px"
                      marginRight="10px"
                    />
                    <Text>
                      {new Date(concert.date).toLocaleDateString("en-MY")} |{" "}
                      {new Date(concert.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Icon
                      as={FaTicket}
                      color="brand.100"
                      boxSize="20px"
                      marginRight="10px"
                    />
                    <Text>RM{concert.price} </Text>
                    <Spacer />
                  </Flex>
                    <Text>{`AVAILABLE SEATS LEFT: ${concert.seats}`}</Text>
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
}
