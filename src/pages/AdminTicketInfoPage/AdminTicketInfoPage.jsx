import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminTicketInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const toast = useToast();
  const [backendData, setBackendData] = useState(null);
  const [concertTitle, setConcertTitle] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaserUsername, setPurchaserUsername] = useState({});
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/tickets/${id}`);
        const ticketData = response.data;
        setBackendData(ticketData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (backendData && backendData.user.username !== undefined) {
      setConcertTitle(backendData.concert.title);
      setStatus(backendData.status);
      setQuantity(backendData.quantity);
      setPurchaserUsername(backendData.user.username);
      setArtist(backendData.concert.artist.username);
      setPrice(backendData.concert.price);
      setDescription(backendData.concert.description);
      setVenue(backendData.concert.venue);
    }
  }, [backendData]);

  if (loading || backendData === null) return <p>Loading...</p>;

  const handleTicketDelete = async (backendId) => {
    try {
        const idParam = {
            id: backendId,
        }

        await api.delete("/tickets", { data: idParam });

        toast({
            title: "Succesful.",
            description: "The Ticket has been successfully Deleted.",
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
        concert: {
          title: concertTitle,
          artist: artist,
          price: price,
          description: description,
          venue: venue,
        },
        status: status,
        quantity: quantity,
        user: {
          username: purchaserUsername,
        },
      };

      await api.patch(`/tickets`, updatedData);

      const response = await api.get(`/tickets/${id}`);
      setBackendData(response.data);

      toast({
        title: "Succesful.",
        description: "The Ticket has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4" color="white">
        Ticket Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">Concert Title</Text>
          <Input color="white" value={concertTitle} readOnly mb="2" />
          <Text color="white">Status</Text>
          <Input color="white" value={status} readOnly mb="2" />
          <Text color="white">Quantity</Text>
          <Input color="white" value={quantity} readOnly mb="2" />
          <Text color="white">Purchaser Username</Text>
          <Input
            color="white"
            value={purchaserUsername}
            readOnly
            mb="2"
          />
          <Text color="white">Artist</Text>
          <Input color="white" value={artist} readOnly mb="2" />
          <Text color="white">Price</Text>
          <Input color="white" value={price} readOnly mb="2" />
          <Text color="white">Description</Text>
          <Input color="white" value={description} readOnly mb="2" />
          <Text color="white">Venue</Text>
          <Input color="white" value={venue} readOnly mb="2" />
        </Box>
        <Flex>
          <Button
            colorScheme="red"
            onClick={() => handleTicketDelete(backendData._id)}
          >
            Delete
          </Button>
          <Spacer />
          <Button colorScheme="gray" isDisabled={true}>
            Save Changes
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AdminTicketInfoPage;
