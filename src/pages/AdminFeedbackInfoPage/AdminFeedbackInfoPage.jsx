import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, Textarea, Flex, Spacer, useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminFeedbackInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const toast = useToast();
  const [backendData, setBackendData] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/feedbacks/${id}`);
        setBackendData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (backendData && backendData.username !== undefined) {
      setUserName(backendData.username || "");
      setEmail(backendData.email || "");
      setMessage(backendData.message || "");
    }
  }, [backendData]);

  const handleFeedBackDelete = async (backendId) => {
    try {
        const idParam = {
            id: backendId,
        }

        await api.delete("/feedbacks", { data: idParam });

        toast({
            title: "Succesful.",
            description: "The Feedback has been successfully Deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom-right",
          });
    }catch(error) {
        console.error(error)
    }
  }

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        id: id,
        username: userName,
        email: email,
        message: message,
      };

      await api.patch(`/feedbacks`, updatedData);

      const response = await api.get(`/feedbacks/${id}`);
      setBackendData(response.data);

      toast({
        title: "Succesful.",
        description: "The FeedBack has been successfully Updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (loading || backendData === null) return <p>Loading...</p>;

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4" color="white">
        Feedback Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" readOnly />
          <Text color="white">User Name</Text>
          <Input
            color="white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            mb="2"
          />
          <Text color="white">Email</Text>
          <Input
            color="white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="2"
          />
          <Text color="white">Message</Text>
          <Textarea
            color="white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mb="2"
          />
        </Box>
        <Flex>
          <Button
            colorScheme="red"
            onClick={() => handleFeedBackDelete(backendData._id)}
          >
            Delete
          </Button>
          <Spacer />
          <Button colorScheme="blue" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminFeedbackInfoPage;
