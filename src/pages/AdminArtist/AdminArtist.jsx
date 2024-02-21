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

const AdminArtistPage = ({
  setLoading,
  navigate,
  searchTerm,
  setSearchTerm,
}) => {
  const rowsPerPage = 10;
  const [artistResponse, setArtistResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get("/artists");
        setArtistResponse(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchConcerts();
  }, [refreshData]);

  const handleRefresh = () => {
    setRefreshData((prev) => !prev);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(artistResponse.length / rowsPerPage);

  const filteredRows = artistResponse.filter(
    (artist) =>
      artist.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.social.join(", ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current pages data
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleRowClick = (id) => {
    navigate(`/AdminArtistInfoPage/${id}`);
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
                <Td>{artist.social.join(", ")}</Td>
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
