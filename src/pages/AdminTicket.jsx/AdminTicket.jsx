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
  Input,
} from "@chakra-ui/react";
import api from "../../api/api";

const AdminTicketPage = ({
  setLoading,
  navigate,
  searchTerm,
  setSearchTerm,
}) => {
  const rowsPerPage = 10;
  const [ticketResponse, setTicketResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get("/tickets");
        setTicketResponse(response.data);

        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        setLoading(false);
      }
    };

    fetchTickets();
  }, [refreshData]);

  const handleRefresh = () => {
    setRefreshData((prev) => !prev);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(ticketResponse.length / rowsPerPage);

  // Get the current pages data
  const paginatedRows = ticketResponse
    .filter(
      (ticket) =>
        ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.concert &&
          ticket.concert.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/adminTicketInfoPage/${id}`);
    setLoading(true);
  };

  return (
    <ChakraProvider>
      <Box p="4">
        <Flex>
          <Button onClick={handleRefresh} mb="4" colorScheme="red">
            Refresh Data
          </Button>
          <Input
            color="white"
            ml="20px"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
        <Table variant="simple" colorScheme="white" color="white">
          <TableCaption>Admin Ticket</TableCaption>
          <Thead>
            <Tr>
              <Th color="white">ID</Th>
              <Th color="white">Status</Th>
              <Th color="white">Concert</Th>
              <Th color="white">Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedRows.map((ticket) => (
              <Tr key={ticket._id} onClick={() => handleRowClick(ticket._id)}>
                <Td>{ticket._id}</Td>
                <Td>{ticket.status}</Td>
                <Td>{ticket.concert ? ticket.concert.title : "N/A"}</Td>
                <Td>{ticket.date}</Td>
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

export default AdminTicketPage;
