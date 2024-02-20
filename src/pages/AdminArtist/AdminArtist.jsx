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

const AdminArtistPage = ({ setLoading, navigate }) => {
  const rowsPerPage = 10; 
  const [artistResponse, setArtistResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get("/artists");
        setArtistResponse(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error)
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(artistResponse.length / rowsPerPage);

  // Get the current pages data
  const paginatedRows = artistResponse.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleRowClick = (id) => {
    navigate(`/AdminArtistInfoPage/${id}`)
    setLoading(true)
  };

  return (
    <ChakraProvider>
      <Box p="4">
        <Table variant="simple" colorScheme="white" color="white">
          <TableCaption>Admin Artist</TableCaption>
          <Thead>
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Bio</Th>
              <Th color="white">Social</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedRows.map((artist) => (
              <Tr key={artist._id} onClick={() => handleRowClick(artist._id)}>
                <Td>{artist.username}</Td>
                <Td>{artist.bio}</Td>
                <Td>{artist.social}</Td>
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

export default AdminArtistPage;
