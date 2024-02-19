import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminFeedbackInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/feedbacks/${id}`);
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
        FeedBack Data Page
      </Text>
      <Box>
        <Box mb="2">
        <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" />
          <Text color="white">User Name</Text>
          <Input color="white" defaultValue={backendData.username} mb="2" />
          <Text color="white">Email</Text>
          <Input color="white" defaultValue={backendData.email} mb="2" />
          <Text color="white">Message</Text>
          <Textarea color="white" defaultValue={backendData.message} mb="2" />
        </Box>
        <Button colorScheme="blue">Save Changes</Button>
      </Box>
    </Box>
  );
};

export default AdminFeedbackInfoPage;
