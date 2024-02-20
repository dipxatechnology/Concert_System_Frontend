import React, { useState } from "react";
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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import api from "../../api/api";
import { AnimCursor } from "../AnimCursor";

const ArtistModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState("");
  const [genre, setGenre] = useState([]);
  const [bio, setBio] = useState("");
  const [social, setSocial] = useState([]);
  const [newSocial, setNewSocial] = useState("");
  const [newGenre, setNewGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createArtistData = {
        username,
        roles : ["Artist"],
        profile,
        genre,
        bio,
        social,
        concert: [""],
      };

      await api.post("/artists", createArtistData);

      toast({
        title: "Successful.",
        description: "Artist created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

      onClose();
    } catch (error) {
      console.error("Error during artist creation:", error);

      toast({
        title: "Error.",
        description: `An error occurred: ${error}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleAddSocial = () => {
    setSocial([...social, newSocial]);
    setNewSocial("");
  };

  const handleAddGenre = () => {
    setGenre([...genre, newGenre]);
    setNewGenre("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="#222222" color="white">
        <AnimCursor />
        <ModalHeader fontWeight="bold">Create New Artist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
          <FormControl mb="4">
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Profile:</FormLabel>
              <Input
                placeholder="Image URL"
                onChange={(e) => setProfile(e.target.value)}
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
                  {genre.map((url, index) => (
                    <li key={index}>{url}</li>
                  ))}
                </ul>
              )}
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Bio:</FormLabel>
              <Input
                type="text"
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Social:</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Social Media URL"
                  value={newSocial}
                  onChange={(e) => setNewSocial(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    bg="#2222222"
                    color="white"
                    onClick={handleAddSocial}
                  >
                    Add
                  </Button>
                </InputRightElement>
              </InputGroup>
              {social.length > 0 && (
                <ul>
                  {social.map((url, index) => (
                    <li key={index}>{url}</li>
                  ))}
                </ul>
              )}
            </FormControl>
            <Button type="submit" colorScheme="blue" mt="4">
              Create Artist
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ArtistModal;
