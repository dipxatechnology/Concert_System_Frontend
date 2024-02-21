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
  Input,
} from "@chakra-ui/react";
import api from "../../api/api";
import AdminTicketPage from "../AdminTicket.jsx";
import AdminArtistPage from "../AdminArtist";
import AdminConcertPage from "../AdminConcert";
import AdminFeedbackPage from "../AdminFeedback";
import { useNavigate } from "react-router-dom";
import UserModal from "../../components/modals/UserModal.jsx";
import ArtistModal from "../../components/modals/ArtistModal.jsx";
import ConcertModal from "../../components/modals/ConcertModal.jsx";
import FeedbackModal from "../../components/modals/FeedBackModal.jsx";

const AdminPage = ({ setLoading }) => {
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [userResponse, setUserResponse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("User");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);
  const [isConcertModalOpen, setIsConcertModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUserResponse(response.data);
        params: {
          searchTerm;
        }
        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refreshData]);

  const handleRefresh = () => {
    setRefreshData((prev) => !prev);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(userResponse.length / rowsPerPage);

  const filteredRows = userResponse.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  // Get the current pages data
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/adminInfoPage/${id}`);
    setLoading(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleOpenTicketModal = () => {
    setIsTicketModalOpen(true);
  };

  const handleCloseTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  const handleOpenArtistModal = () => {
    setIsArtistModalOpen(true);
  };

  const handleCloseArtistModal = () => {
    setIsArtistModalOpen(false);
  };

  const handleOpenConcertModal = () => {
    setIsConcertModalOpen(true);
  };

  const handleCloseConcertModal = () => {
    setIsConcertModalOpen(false);
  };

  const handleOpenFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
  };

  return (
    <ChakraProvider>
      <Tabs variant="soft-rounded" colorScheme="green">
        <Flex>
          <TabList>
            <Tab onClick={() => handleTabChange("User")}>User</Tab>
            <Tab onClick={() => handleTabChange("Ticket")}>Ticket</Tab>
            <Tab onClick={() => handleTabChange("Artist")}>Artist</Tab>
            <Tab onClick={() => handleTabChange("Concert")}>Concert</Tab>
            <Tab onClick={() => handleTabChange("Feedback")}>Feedback</Tab>
          </TabList>
          <Spacer />
          <Button
            isDisabled={activeTab === "Ticket"}
            colorScheme="red"
            onClick={() => {
              switch (activeTab) {
                case "User":
                  handleOpenUserModal();
                  break;
                case "Ticket":
                  handleOpenTicketModal();
                  break;
                case "Artist":
                  handleOpenArtistModal();
                  break;
                case "Concert":
                  handleOpenConcertModal();
                  break;
                case "Feedback":
                  handleOpenFeedbackModal();
                  break;
                default:
                  break;
              }
            }}
          >
            {activeTab === "User" && "Create New User"}
            {activeTab === "Ticket" && "Create New Ticket"}
            {activeTab === "Artist" && "Create New Artist"}
            {activeTab === "Concert" && "Create New Concert"}
            {activeTab === "Feedback" && "Create New Feedback"}
          </Button>
        </Flex>
        <TabPanels>
          <TabPanel>
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
                <TableCaption>Admin User</TableCaption>
                <Thead>
                  <Tr>
                    <Th color="white">ID</Th>
                    <Th color="white">Name</Th>
                    <Th color="white">Email</Th>
                    <Th color="white">Roles</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedRows.map((user) => (
                    <Tr key={user._id} onClick={() => handleRowClick(user._id)}>
                      <Td>{user._id}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.roles}</Td>
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
          <TabPanel>
            <AdminTicketPage setLoading={setLoading} navigate={navigate} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </TabPanel>
          <TabPanel>
            <AdminArtistPage setLoading={setLoading} navigate={navigate} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </TabPanel>
          <TabPanel>
            <AdminConcertPage setLoading={setLoading} navigate={navigate} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </TabPanel>
          <TabPanel>
            <AdminFeedbackPage setLoading={setLoading} navigate={navigate} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <UserModal isOpen={isUserModalOpen} onClose={handleCloseUserModal} />
      <ArtistModal
        isOpen={isArtistModalOpen}
        onClose={handleCloseArtistModal}
      />
      <ConcertModal
        isOpen={isConcertModalOpen}
        onClose={handleCloseConcertModal}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleCloseFeedbackModal}
      />
    </ChakraProvider>
  );
};

export default AdminPage;
