import { useParams } from "react-router-dom";
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
  Select,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { FaTicket, FaLocationDot, FaMusic } from "react-icons/fa6";
import api from "../../api/api";
import { useState, useEffect } from "react";
import PaymentModal from "../../components/modals/PaymentModal";
import "./events.css";

export default function SpecificEvent({ loading, setLoading }) {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [event, setEvent] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/concerts/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  if (!event && loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="event-style">
      <Box className="box">
        <Stack align="center">
          <Text fontSize="5xl">{event.title}</Text>
          <Card color="white" borderRadius="xl" bg="rgba(85, 85, 85, 0.5)">
            <CardBody>
              <Image
                borderRadius="xl"
                boxSize="600px"
                objectFit="cover"
                src={event.profile}
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
                  {toTitleCase(event.venue)}, {toTitleCase(event.city)},{" "}
                  {toTitleCase(event.state)}, {toTitleCase(event.country)}{" "}
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <CalendarIcon
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>
                  {new Date(event.date).toLocaleDateString("en-MY")} |{" "}
                  {new Date(event.date).toLocaleTimeString("en-US", {
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
                <Text>{event.genre.map(toTitleCase).join(", ")}</Text>
              </Flex>
              <Flex
                justifyContent="center"
                alignItems="center"
                marginTop="30px"
              >
                <Text fontWeight="600" marginRight="10px">
                  Tickets Available :{" "}
                </Text>
                <Text>{event.seats}</Text>
              </Flex>
              <Divider margin="15px 0" />
              <Box display="flex" alignItems="center" justifyContent="center">
                <Text textAlign="center" maxWidth="60%">
                  {event.description}
                </Text>
              </Box>
              <Divider margin="15px 0" />
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  as={FaTicket}
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>RM{event.price} </Text>
                <Select
                  borderRadius="5px"
                  size="sm"
                  marginLeft="20px"
                  maxWidth="15vh"
                  bg="white"
                  color="black"
                  value={selectedQuantity}
                  onChange={(e) =>
                    setSelectedQuantity(parseInt(e.target.value, 10))
                  }
                  max={event.seats}
                >
                  {[...Array(event.seats + 1).keys()].map((num) => (
                    <option key={num}>{num}</option>
                  ))}
                </Select>
              </Flex>
            </CardBody>
          </Card>
          <PaymentModal event={event} selectedQuantity={selectedQuantity} />
        </Stack>
      </Box>
    </div>
  );
}
