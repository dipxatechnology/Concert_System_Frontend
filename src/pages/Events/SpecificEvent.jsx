import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { useParams } from "react-router-dom";

import { Text } from "@chakra-ui/react";
import "./events.css";

const CONCERT_QUERY = gql`
  query GetConcert($id: ID!) {
    concert(id: $id) {
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
        Price
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
`;

export default function SpecificEvent() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CONCERT_QUERY, {
    variables: { id },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const concertData = data.concert;
  console.log(concertData);
  return (
    <div className="event-style">
      <Text>Cool</Text>
    </div>
  );
}
