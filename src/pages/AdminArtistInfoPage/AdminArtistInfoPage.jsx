import React, { useEffect, useState } from "react";
import { Box, Text, Input, Button, Toast, useToast, Flex, Spacer } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminArtistInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const toast = useToast();
  const [backendData, setBackendData] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState("");
  const [genre, setGenre] = useState([]);
  const [bio, setBio] = useState("");
  const [social, setSocial] = useState([]);
  const [concert, setConcert] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/artists/${id}`);
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

  useEffect(() => {
    if (backendData && backendData.username !== undefined) {
      setArtistName(backendData.username);
      setRoles(backendData.roles || []);
      setProfile(backendData.profile || "");
      setGenre(backendData.genre || []);
      setBio(backendData.bio || "");
      setSocial(backendData.social || []);
      setConcert(backendData.concert.map((concert) => concert._id).join(", "));
    }
  }, [backendData]);

  if (loading || backendData === null) return <p>Loading...</p>;

  const handleArtistDelete = async (backendId) => {
    try {
        const idParam = {
            id: backendId,
        }

        await api.delete("/artists", { data: idParam });

        toast({
            title: "Succesful.",
            description: "The Artist has been successfully Deleted.",
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
        id,
        username: artistName,
        roles,
        profile,
        genre,
        bio,
        social,
        concerts: concert === "" ? [] : concert.split(", ").map(id => id.trim())
      };

      await api.patch(`/artists`, updatedData);

      // fetch the updated data after saving
      const response = await api.get(`/artists/${id}`);
      setBackendData(response.data);

      toast({
        title: "Succesful.",
        description: "The Artist has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      // Handle error
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Box p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4" color="white">
        Artist Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" readOnly />
          <Text color="white">Artist Name</Text>
          <Input
            color="white"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            mb="2"
          />
          <Text color="white">Roles</Text>
          <Input
            color="white"
            value={roles.join(", ")}
            onChange={(e) => setRoles(e.target.value.split(", "))}
            mb="2"
          />
          <Text color="white">Profile</Text>
          <Input
            color="white"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            mb="2"
          />
          <Text color="white">Genre</Text>
          <Input
            color="white"
            value={genre.join(", ")}
            onChange={(e) => setGenre(e.target.value.split(", "))}
            mb="2"
          />
          <Text color="white">Bio</Text>
          <Input
            color="white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            mb="2"
          />
          <Text color="white">Socials</Text>
          <Input
            color="white"
            value={social.join(", ")}
            onChange={(e) => setSocial(e.target.value.split(", "))}
            mb="2"
          />
          <Text color="white">Concerts</Text>
          <Input
            color="white"
            value={concert}
            onChange={(e) => setConcert(e.target.value)}
            mb="2"
          />
        </Box>
        <Flex>
        <Button colorScheme="red" onClick={() => handleArtistDelete(backendData._id)}>
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

export default AdminArtistInfoPage;
