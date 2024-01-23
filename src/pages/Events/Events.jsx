import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
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
} from "@chakra-ui/react";

import { CalendarIcon } from "@chakra-ui/icons";
import { FaTicket } from "react-icons/fa6";
import "./events.css";

const CONCERTS_QUERY = gql`
  query concertFindAll {
    concerts {
      data {
        id
        attributes {
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

export default function Events() {
  const { loading, error, data } = useQuery(CONCERTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const concerts = data.concerts.data;

  return (
    <div className="event-style">
      <Heading as="h1" size="2xl" margin="20px 0">
        All Events
      </Heading>
      <SimpleGrid columns={3} spacing={10}>
        {concerts.map((concert, index) => {
          const concertData = concert.attributes;
          const image = `http://localhost:1337${concertData.avatar?.data?.attributes?.formats?.thumbnail?.url}`;
          console.log(
            `http://localhost:1337${concertData.avatar?.data?.attributes?.formats?.thumbnail?.url}`
          );

          return (
            <Card
              key={index}
              color="white"
              borderRadius="xl"
              width="auto"
              bg="rgba(85, 85, 85, 0.5)"
              marginTop="5vh"
            >
              <CardBody>
                <Image
                  src={image} // Assuming `avatar` is an object with a `url` property
                  alt={concertData.title}
                  borderRadius="xl"
                />

                <Divider mt="5" borderWidth="1px" />
                <Stack mt="3" textAlign="center">
                  <Text fontSize="2xl" color="#D45161">
                    {concertData.title}
                  </Text>
                  <Text>
                    {concertData.venue}, {concertData.state},{" "}
                    {concertData.country}
                  </Text>
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
                      {concertData.date} | {concertData.time}
                    </Text>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Icon
                      as={FaTicket}
                      color="brand.100"
                      boxSize="20px"
                      marginRight="10px"
                    />
                    <Text>
                      From: {concertData.description[0].children[0].text}
                    </Text>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </div>
  );
}
