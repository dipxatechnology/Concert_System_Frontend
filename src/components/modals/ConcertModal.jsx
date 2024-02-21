import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import api from "../../api/api";
import { AnimCursor } from "../AnimCursor";
import "./datepicker.css";

const ConcertModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [newGenre, setNewGenre] = useState("");
  const [genre, setGenre] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    profile: "",
    date: "",
    city: "",
    state: "",
    country: "",
    artist: selectedArtist,
    price: "",
    description: "",
    venue: "",
  });
  
  const handleAddGenre = () => {
    setGenre([...genre, newGenre]);
    setNewGenre("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formattedDate = selectedDate.toISOString();
        const response = await api.post("/concerts", {
          ...formData,
          genre: genre, 
          date: formattedDate,
          artist: selectedArtist,
        });

      if (response.status === 201) {
        toast({
          title: "New Concert Created.",
          description: "Concert successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });

        setFormData({
          title: "",
          profile: "",
          date: "",
          city: "",
          state: "",
          country: "",
          artist: selectedArtist,
          price: "",
          description: "",
          venue: "",
        });

        setGenre([]);
        onClose();
      } else {
        console.error("Error creating concert:", response.data);
      }
    } catch (error) {
      console.error("Error creating concert:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="#222222" color="white">
        <AnimCursor />
        <ModalHeader fontWeight="bold">Create New Concert</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Title:</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Profile:</FormLabel>
              <Input
                type="text"
                name="profile"
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
          <FormLabel color="white">Select Artist:</FormLabel>
          <Select
            placeholder="Select artist"
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            required
          >
            {artists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.username}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mb="4">
              <FormLabel>Date and Time:</FormLabel>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>City:</FormLabel>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>State:</FormLabel>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Country:</FormLabel>
              <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Genre:</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Genre Types"
                  value={newGenre}
                  onChange={(e) => setNewGenre(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    bg="#2222222"
                    color="white"
                    onClick={handleAddGenre}
                  >
                    Add
                  </Button>
                </InputRightElement>
              </InputGroup>
              {genre.length > 0 && (
                <ul>
                  {genre.map((g, index) => (
                    <li key={index}>{g}</li>
                  ))}
                </ul>
              )}
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Price:</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description:</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Venue:</FormLabel>
              <Input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt="4">
              Create Concert
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ConcertModal;
