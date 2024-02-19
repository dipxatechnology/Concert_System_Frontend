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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import api from "../../api/api";
import AdminTicketPage from "../AdminTicket.jsx";
import AdminArtistPage from "../AdminArtist";
import AdminConcertPage from "../AdminConcert";
import AdminFeedbackPage from "../AdminFeedback";
import { useNavigate } from "react-router-dom";

const AdminPage = ({ setLoading }) => {
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [userResponse, setUserResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUserResponse(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(userResponse.length / rowsPerPage);

  // Get the current pages data
  const paginatedRows = userResponse.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/adminInfoPage/${id}`)
    setLoading(true)
  };

  return (
    <ChakraProvider>
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>User</Tab>
          <Tab>Ticket</Tab>
          <Tab>Artist</Tab>
          <Tab>Concert</Tab>
          <Tab>Feedback</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box p="4">
              <Table variant="simple" colorScheme="white" color="white">
                <TableCaption>Admin User</TableCaption>
                <Thead>
                  <Tr>
                    <Th color="white">ID</Th>
                    <Th color="white">Name</Th>
                    <Th color="white">Email</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedRows.map((user) => (
                    <Tr key={user._id} onClick={() => handleRowClick(user._id)}>
                      <Td>{user._id}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.email}</Td>
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
                    colorScheme={
                      currentPage === index + 1 ? "red" : "whiteAlpha"
                    }
                    onClick={() => goToPage(index + 1)}
                    mx="1"
                  >
                    {index + 1}
                  </Button>
                ))}
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel><AdminTicketPage setLoading={setLoading} navigate={navigate}/></TabPanel>
          <TabPanel><AdminArtistPage setLoading={setLoading} navigate={navigate}/></TabPanel>
          <TabPanel><AdminConcertPage setLoading={setLoading} navigate={navigate}/></TabPanel>
          <TabPanel><AdminFeedbackPage setLoading={setLoading} navigate={navigate}/></TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};

export default AdminPage;
