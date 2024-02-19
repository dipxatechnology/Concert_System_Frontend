import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/users/${id}`);
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
        User Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" />
          <Text color="white">Name</Text>
          <Input color="white" defaultValue={backendData.username} mb="2" />
          <Text color="white">Email</Text>
          <Input color="white" defaultValue={backendData.email} mb="2" />
          <Text color="white">Phone Number</Text>
          <Input color="white" defaultValue={backendData.phone_number} mb="2" />
          <Text color="white">Roles</Text>
          <Input color="white" defaultValue={backendData.roles} mb="2" />
          <Text color="white">Profile</Text>
          <Input color="white" defaultValue={backendData.profile} mb="2" />
          <Text color="white">Address</Text>
          <Input color="white" defaultValue={backendData.address} mb="2" />
          <Text color="white">Postcode</Text>
          <Input color="white" defaultValue={backendData.postcode} mb="2" />
          <Text color="white">Country</Text>
          <Input color="white" defaultValue={backendData.country} mb="2" />
          <Text color="white">Ticket</Text>
          <Input color="white" defaultValue={backendData.ticket._id} mb="2" />
        </Box>
        <Button colorScheme="blue">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default AdminInfoPage;
