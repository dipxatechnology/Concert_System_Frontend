import { Text, Box, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./terms.css";

export default function Terms() {
  return (
    <div className="container">
      <Center>
        <Box width="60%" maxWidth="80%" mt="3vh">
          <Center>
            <Text fontSize="5xl" fontWeight="600" color="brand.100">
              TERMS OF USE
            </Text>
          </Center>
          <Text fontSize="xl" fontWeight="bold" mt="5vh">
            Introduction
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Welcome to our concert event. These are the Terms and Conditions
            that govern your attendance and participation in our event.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold" mt="3vh">
            Section 1 - Acceptance of Terms
          </Text>
          <Text fontSize="xl">
            By purchasing a ticket, you agree to be bound by these Terms and
            Conditions. If you do not agree with any part of these Terms and
            Conditions, you should not purchase a ticket.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 2 - Tickets
          </Text>
          <Text fontSize="xl">
            Tickets are sold on a first-come, first-served basis. Each purchase
            dictates the quantity of entry per person to the event. Tickets are
            non-transferable and non-refundable.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 3 - Event Entry
          </Text>
          <Text fontSize="xl">
            Attendees must present a valid ticket to gain entry to the event. We
            reserve the right to refuse entry to anyone who cannot present a
            valid ticket.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 4 - Conduct at the Event
          </Text>
          <Text fontSize="xl">
            Attendees are expected to behave in a respectful and appropriate
            manner. We reserve the right to remove any attendee who behaves in a
            disruptive or inappropriate manner.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 5 - Liability
          </Text>
          <Text fontSize="xl">
            We are not responsible for any personal belongings that are lost,
            damaged, or stolen at the event. Attendees are responsible for their
            own belongings.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 6 - Changes to the Event
          </Text>
          <Text fontSize="xl">
            We reserve the right to make changes to the event schedule,
            including changes to the performers, dates, and times. In the event
            of a cancellation, we will provide a refund for the ticket price.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 7 - Privacy
          </Text>
          <Text fontSize="xl">
            We respect your privacy. Any personal information collected during
            the ticket purchase process will be used in accordance with our
            Privacy Policy.
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mt="5vh">
            Contact Us
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold" mb="5vh">
            If you have any questions about these Terms and Conditions, please
            contact us{" "}
            <Link to="/contact">
              <Box as="span" color="#D45161">
                here
              </Box>
            </Link>
            .
          </Text>
        </Box>
      </Center>
    </div>
  );
}
