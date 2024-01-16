import {
  Text,
  Card,
  Modal,
  Icon,
  Button,
  Box,
  Spacer,
  HStack,
  SimpleGrid,
  Divider,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
  Stack,
  Center,
} from "@chakra-ui/react";
import {
  RiSearch2Line,
  RiCalendarEventLine,
  RiMapPin2Fill,
} from "react-icons/ri";

import "./tickethistory.css";

export default function TicketHistory() {
  return (
    <div>
      <Box className="container">
        <Text fontWeight="bold" fontSize="3xl">
          Ticket Purchase History
        </Text>
        <HStack mt="5vh">
          <Text>
            6 <span style={{ color: "grey" }}>results found</span>
          </Text>
          <Spacer />
          <Button
            bg="brand.100"
            _hover={{ bg: "brand.200" }}
            fontWeight="bold"
            padding="10px"
            marginRight="8px"
            size="xs"
          >
            <Icon as={RiSearch2Line} marginRight="10px" boxSize="20px" />
            Search ticket
          </Button>
        </HStack>
        <Divider margin="15px 0" />
        <SimpleGrid columns={3} spacing={10}>
          {/*Sample for card*/}
          <Card bg="Foreground" color="white">
            <CardHeader>
              <Text fontWeight="600" fontSize="xl">
                Client Report
              </Text>
            </CardHeader>
            <CardBody>
              <Flex alignItems="center">
                <Icon
                  as={RiCalendarEventLine}
                  boxSize="20px"
                  marginRight="10px"
                />
                <Stack spacing="0">
                  <Text>Date</Text>
                  <Text color="grey">Time</Text>
                </Stack>
              </Flex>
              <Flex alignItems="center" mt="15px">
                <Icon as={RiMapPin2Fill} boxSize="20px" marginRight="10px" />
                <Text>Location</Text>
              </Flex>
            </CardBody>
            <Divider color="grey" />
            <CardFooter>
              <Flex justifyContent="center" alignItems="center" width="100%">
                <Text color="brand.100">Ola</Text>
              </Flex>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Box>
    </div>
  );
}
