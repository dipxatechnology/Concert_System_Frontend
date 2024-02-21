import { useState, useEffect } from "react";
import { useParams, useNavigate, json } from "react-router-dom";

import {
  Text,
  Image,
  Box,
  Icon,
  Stack,
  Flex,
  Card,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaTicket, FaLocationDot, FaMusic } from "react-icons/fa6";

import { PiMoney } from "react-icons/pi";

import api from "../../api/api";

import "./profile.css";

export default function PurchaseDetails({ setLoading, loading }) {
  const { id } = useParams();
  const [ticket, setTicket] = useState("");
  const [artist, setArtist] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, setLoading]);

  useEffect(() => {
    if (ticket) {
      const fetchArtist = async () => {
        try {
          const response = await api.get(
            `/artists/${ticket.concert.artist._id}`
          );
          setArtist(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchArtist();
    }
  }, [ticket, setLoading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!artist) return <p>Loading...</p>;
  if (!ticket) return <p>Loading...</p>;

  console.log(ticket);
  console.log(artist);

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="container">
      <Box className="box">
        <Stack align="center">
          <Text fontSize="5xl">{ticket.concert.title}</Text>
          <Card color="white" borderRadius="xl" bg="rgba(85, 85, 85, 0.5)">
            <CardBody>
              <Image
                borderRadius="xl"
                boxSize="600px"
                objectFit="cover"
                src={ticket.concert.profile}
              />
              <Flex
                justifyContent="center"
                alignItems="flex-start"
                marginTop="3vh"
              >
                <Icon
                  as={FaLocationDot}
                  color="brand.100"
                  boxSize="20px"
                  marginRight="5px"
                />
                <Text>
                  {toTitleCase(ticket.concert.venue)},{" "}
                  {toTitleCase(ticket.concert.city)},{" "}
                  {toTitleCase(ticket.concert.state)},{" "}
                  {toTitleCase(ticket.concert.country)}{" "}
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <CalendarIcon
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>
                  {new Date(ticket.concert.date).toLocaleDateString("en-MY")} |{" "}
                  {new Date(ticket.concert.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <Icon
                  as={FaMusic}
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>{ticket.concert.genre.map(toTitleCase).join(", ")}</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <Icon
                  as={PiMoney}
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>RM{ticket.concert.price} </Text>
                <Box width="50px" />
                <Icon
                  as={FaTicket}
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>{ticket.quantity} </Text>
              </Flex>
              <Divider margin="15px 0" />
              <Box display="flex" alignItems="center" justifyContent="center">
                <Text textAlign="center" maxWidth="60%">
                  {ticket.concert.description}
                </Text>
              </Box>
              <Divider margin="15px 0" />

              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="xl" color="brand.100" fontWeight="600">
                  Artist Details
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <Text>Name: {artist.username}</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <Text>Biography: {artist.bio}</Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <Text>Genre: {artist.genre.map(toTitleCase).join(", ")}</Text>
              </Flex>
              <Divider margin="15px 0" />
              <Flex justifyContent="center" alignItems="center" margin="15px 0">
                <Text>Status: </Text>
                <Box width="5px" />
                <Text color="brand.100">{ticket.status} </Text>
              </Flex>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </div>
  );
}
