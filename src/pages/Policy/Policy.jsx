import { Text, Box, Center, List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./policy.css";

export default function Policy() {
  return (
    <div className="container">
      <Center>
        <Box width="60%" maxWidth="80%" mt="3vh">
          <Center>
            <Text fontSize="5xl" fontWeight="600" color="brand.100">
              PRIVACY POLICY
            </Text>
          </Center>
          <Text fontSize="xl" fontWeight="bold" mt="5vh">
            Introduction
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            We respect the privacy of our concert attendees. This Privacy Policy
            outlines the types of personal information we collect, how we use
            it, and the steps we take to protect it.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold" mt="3vh">
            Section 1 - Information We Collect
          </Text>
          <Text fontSize="xl">
            When you purchase a ticket, we collect the following information:
            <List styleType="disc">
              <ListItem>
                Contact information: Your name, email address, and phone number.
              </ListItem>
            </List>
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 2 - How We Use Your Information
          </Text>
          <Text fontSize="xl">
            We use your information for the following purposes:
            <List styleType="disc">
              <ListItem>To process your ticket purchase.</ListItem>
              <ListItem>To send you updates about the event.</ListItem>
              <ListItem>To respond to your inquiries.</ListItem>
            </List>
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 3 - How We Protect Your Information
          </Text>
          <Text fontSize="xl">
            We implement a variety of security measures to maintain the safety
            of your personal information. Your personal information is contained
            behind secured networks and is only accessible by a limited number
            of persons who have special access rights to such systems, and are
            required to keep the information confidential.
          </Text>
          <Box height="20px" />
          <Text fontSize="xl" fontWeight="bold">
            Section 4 - Changes to This Privacy Policy
          </Text>
          <Text fontSize="xl">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
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
