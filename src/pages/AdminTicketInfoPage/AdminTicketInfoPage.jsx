import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminTicketInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);
        setBackendData(response.data);
        setLoading(false);
      } catch (error) {
        // Handle error (e.g., setError(error))
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || backendData === null) return <p>Loading...</p>;

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4" color="white">
        Ticket Data Page
      </Text>
      <Box>
        <Box mb="2">
        <Text color="white">Concert Title</Text>
          <Input color="white" defaultValue={backendData.concert.title} mb="2" />
          <Text color="white">Status</Text>
          <Input color="white" defaultValue={backendData.status} mb="2" />
          <Text color="white">Quantity</Text>
          <Input color="white" defaultValue={backendData.quantity} mb="2" />
          <Text color="white">Purchaser Username</Text>
          <Input color="white" defaultValue={backendData.user.username} mb="2" />
          <Text color="white">Artist</Text>
          <Input color="white" defaultValue={backendData.concert.artist} mb="2" />
          <Text color="white">Price</Text>
          <Input color="white" defaultValue={backendData.concert.price} mb="2" />
          <Text color="white">Description</Text>
          <Input color="white" defaultValue={backendData.concert.description} mb="2" />
          <Text color="white">Venue</Text>
          <Input color="white" defaultValue={backendData.concert.venue} mb="2" />
        </Box>
        <Button colorScheme="blue">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default AdminTicketInfoPage;
