import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, useToast, Flex, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminConcertInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const toast = useToast();
  const [backendData, setBackendData] = useState(null);
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState({});
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [seats, setSeats] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/concerts/${id}`);
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
    if (backendData && backendData.title !== undefined) {
      setTitle(backendData.title);
      setProfile(backendData.profile);
      setDate(backendData.date);
      setCity(backendData.city);
      setState(backendData.state);
      setCountry(backendData.country);
      setGenre(backendData.genre);
      setArtist(backendData.artist._id);
      setPrice(backendData.price);
      setDescription(backendData.description);
      setVenue(backendData.venue);
      setSeats(backendData.seats);
    }
  }, [backendData]);

  if (loading || backendData === null) return <p>Loading...</p>;

  const handleUserDelete = async (backendId) => {
    try {
      const idParam = {
        id: backendId,
      };

      await api.delete("/concerts", { data: idParam });

      toast({
        title: "Succesful.",
        description: "The Concert has been successfully Deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        id: id,
        title: title,
        profile: profile,
        date: date,
        city: city,
        state: state,
        country: country,
        genre: genre,
        artist: artist,
        price: price,
        description: description,
        venue: venue,
        seats,
      };

      await api.patch(`/concerts`, updatedData);

      const response = await api.get(`/concerts/${id}`);
      setBackendData(response.data);

      toast({
        title: "Succesful.",
        description: "The Concert has been successfully updated.",
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
        Concert Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" readOnly />
          <Text color="white">Concert Name</Text>
          <Input
            color="white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb="2"
          />
          <Text color="white">Profile</Text>
          <Input
            color="white"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            mb="2"
          />
          <Text color="white">City</Text>
          <Input
            color="white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            mb="2"
          />
          <Text color="white">State</Text>
          <Input
            color="white"
            value={state}
            onChange={(e) => setState(e.target.value)}
            mb="2"
          />
          <Text color="white">Country</Text>
          <Input
            color="white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            mb="2"
          />
          <Text color="white">Genre</Text>
          <Input
            color="white"
            value={genre.join(", ")}
            onChange={(e) => setGenre(e.target.value.split(", "))}
            mb="2"
          />
          <Text color="white">Artist ID</Text>
          <Input
            color="white"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            mb="2"
          />
          <Text color="white">Price</Text>
          <Input
            color="white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            mb="2"
          />
          <Text color="white">Description</Text>
          <Input
            color="white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            mb="2"
          />
          <Text color="white">Venue</Text>
          <Input
            color="white"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            mb="2"
          />
          <Text color="white">Date</Text>
          <Input color="white" defaultValue={date} mb="2" readOnly />
          <Text color="white">Number of Seats Available</Text>
          <Input
            color="white"
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            mb="2"
          />
        </Box>
        <Flex>
          <Button
            colorScheme="red"
            onClick={() => handleUserDelete(backendData._id)}
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

export default AdminConcertInfoPage;
