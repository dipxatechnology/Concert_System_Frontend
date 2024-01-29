import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
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
import { FaTicket, FaLocationDot } from "react-icons/fa6";
import "./events.css";

const CONCERT_QUERY = gql`
  query concertsFindOne($id: ID!) {
    concert(id: $id) {
      data {
        attributes {
          Price
          title
          date
          time
          venue
          state
          country
          genre
          description
          avatar {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;

export default function SpecificEvent() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CONCERT_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.concert.data.attributes;

  const date = new Date(event.date);

  const formattedDate = date.toLocaleDateString("en-MY");

  const timeString = event.time;

  const timeParts = timeString.split(":");

  date.setHours(timeParts[0], timeParts[1], timeParts[2]);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="event-style">
      <Box className="box">
        <Stack align="center">
          <Text fontSize="5xl">{event.title}</Text>
          <Card
            color="white"
            borderRadius="xl"
            maxWidth="80%"
            bg="rgba(85, 85, 85, 0.5)"
          >
            <CardBody>
              <Image
                borderRadius="xl"
                src={`http://localhost:5000${event?.avatar?.data?.attributes?.formats?.large?.url}`}
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
                  {event.venue}, {event.state}, {event.country}
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center" marginTop="5px">
                <CalendarIcon
                  color="brand.100"
                  boxSize="20px"
                  marginRight="10px"
                />
                <Text>
                  {formattedDate} | {formattedTime}
                </Text>
              </Flex>
              <Divider margin="15px 0" />
              <Box display="flex" alignItems="center" justifyContent="center">
                <Text textAlign="center" maxWidth="60%">
                  {event.description[0].children[0].text}
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
                <Text>RM{event.Price} </Text>
                <Select
                  borderRadius="5px"
                  size="sm"
                  marginLeft="20px"
                  maxWidth="15vh"
                  bg="white"
                  color="black"
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Select>
              </Flex>
            </CardBody>
          </Card>
        </Stack>
      </Box>
    </div>
  );
}
