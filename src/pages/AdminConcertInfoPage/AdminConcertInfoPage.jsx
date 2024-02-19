import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminConcertInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/concerts/${id}`);
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
        Concert Data Page
      </Text>
      <Box>
        <Box mb="2">
        <Text color="white">Concert Title</Text>
          <Input color="white" defaultValue={backendData.title} mb="2" />
          <Text color="white">Profile</Text>
          <Input color="white" defaultValue={backendData.profile} mb="2" />
          <Text color="white">Date</Text>
          <Input color="white" defaultValue={backendData.date} mb="2" />
          <Text color="white">City</Text>
          <Input color="white" defaultValue={backendData.city} mb="2" />
          <Text color="white">State</Text>
          <Input color="white" defaultValue={backendData.state} mb="2" />
          <Text color="white">Country</Text>
          <Input color="white" defaultValue={backendData.country} mb="2" />
          <Text color="white">Genre</Text>
          <Input color="white" defaultValue={backendData.genre} mb="2" />
          <Text color="white">Artist</Text>
          <Input color="white" defaultValue={backendData.artist.username} mb="2" />
          <Text color="white">Price</Text>
          <Input color="white" defaultValue={backendData.price} mb="2" />
          <Text color="white">Description</Text>
          <Input color="white" defaultValue={backendData.description} mb="2" />
          <Text color="white">Venue</Text>
          <Input color="white" defaultValue={backendData.venue} mb="2" />
        </Box>
        <Button colorScheme="blue">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default AdminConcertInfoPage;
