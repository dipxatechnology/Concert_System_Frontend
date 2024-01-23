// MyComponent.test.js

import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { act } from "react-dom/test-utils";
import gql from "graphql-tag";
import MyComponent from "./MyComponent"; // Replace with the actual path to your component

// Define your GraphQL query
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

// Define mocked data
const mock = {
  request: {
    query: CONCERTS_QUERY,
  },
  result: {
    data: {
      concerts: {
        data: [
          {
            id: "1",
            attributes: {
              title: "Concert Title",
              date: "2024-01-01",
              time: "20:00",
              venue: "Concert Venue",
              state: "State",
              country: "Country",
              genre: "Rock",
              description: "Concert Description",
              avatar: {
                data: {
                  attributes: {
                    formats: ["jpg"],
                  },
                },
              },
            },
          },
          // Add more data as needed for testing different scenarios
        ],
      },
    },
  },
};

test("renders component with mocked data", async () => {
  await act(async () => {
    const { getByText } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <MyComponent />
      </MockedProvider>
    );

    // Wait for data to load
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Your test assertions go here
    expect(getByText("Concert Title")).toBeInTheDocument();
    // Add more assertions based on your component's rendering logic
  });
});
