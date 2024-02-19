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

const AdminFeedbackPage = ({ setLoading, navigate }) => {
  const rowsPerPage = 10; 
  const [feedbackResponse, setFeedbackResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("/feedbacks");
        setFeedbackResponse(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(feedbackResponse.length / rowsPerPage);

  // Get the current pages data
  const paginatedRows = feedbackResponse.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/AdminFeedbackInfoPage/${id}`)
  };

  return (
    <ChakraProvider>
      <Box p="4">
        <Table variant="simple" colorScheme="white" color="white">
          <TableCaption>Admin Feedback</TableCaption>
          <Thead>
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Email</Th>
              <Th color="white">Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedRows.map((user) => (
              <Tr key={user._id} onClick={() => handleRowClick(user._id)}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.message}</Td>
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

export default AdminFeedbackPage;
