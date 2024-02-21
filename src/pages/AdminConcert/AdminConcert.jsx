import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import api from "../../api/api";

const AdminConcertPage = ({ setLoading, navigate }) => {
  const rowsPerPage = 10; 
  const [concertResponse, setConcertResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get("/concerts");
        setConcertResponse(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        console.error(error)
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [concertResponse]);

  // Calculate total number of pages
  const totalPages = Math.ceil(concertResponse.length / rowsPerPage);

  // Get the current pages data
  const paginatedRows = concertResponse.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/AdminConcertInfoPage/${id}`)
    setLoading(true)
  };

  return (
    <ChakraProvider>
      <Box p="4">
        <Table variant="simple" colorScheme="white" color="white">
          <TableCaption>Admin Concert</TableCaption>
          <Thead>
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Time</Th>
              <Th color="white">City</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedRows.map((concert) => (
              <Tr key={concert._id} onClick={() => handleRowClick(concert._id)}>
                <Td>{concert.title}</Td>
                <Td>{concert.date}</Td>
                <Td>{concert.city}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex mt="4">
          <Spacer />
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant="outline"
              colorScheme={currentPage === index + 1 ? "red" : "whiteAlpha"}
              onClick={() => goToPage(index + 1)}
              mx="1"
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default AdminConcertPage;
