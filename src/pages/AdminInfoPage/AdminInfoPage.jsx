import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  useToast,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminInfoPage = ({ setLoading, loading }) => {
  const { id } = useParams();
  const toast = useToast();
  const [backendData, setBackendData] = useState(null);
  const [userName, setUserName] = useState("");
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [tickets, setTickets] = useState([]);
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    if (backendData && backendData.username !== undefined) {
      setUserName(backendData.username);
      setRoles(backendData.roles || []);
      setProfile(backendData.profile || "");
      setEmail(backendData.email || []);
      setPhoneNumber(backendData.phone_number || "");
      setAddress(backendData.address || "");
      setPostcode(backendData.postcode || "");
      setCountry(backendData.country || "");
      setPassword(backendData.password || "");
      setTickets(backendData.ticket.map((ticket) => ticket._id).join(", "));
      setDate(backendData.ticket.map((ticket) => ticket.date).join(", "));
    }
  }, [backendData]);

  if (loading || backendData === null) return <p>Loading...</p>;

  const handleUserDelete = async (backendId) => {
    try {
      const idParam = {
        id: backendId,
      };

      await api.delete("/users", { data: idParam });

      toast({
        title: "Succesful.",
        description: "The User has been successfully Deleted.",
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
        username: userName,
        roles: roles,
        profile: profile,
        phone_number: phoneNumber,
        email: Email,
        address: address,
        postcode: postcode,
        country: country,
        password: password,
        ticket: tickets,
      };

      await api.patch(`/users`, updatedData);

      // fetch the updated data after saving
      const response = await api.get(`/users/${id}`);
      setBackendData(response.data);

      toast({
        title: "Succesful.",
        description: "The User has been successfully updated.",
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
        User Data Page
      </Text>
      <Box>
        <Box mb="2">
          <Text color="white">ID</Text>
          <Input color="white" defaultValue={backendData._id} mb="2" readOnly />
          <Text color="white">Name</Text>
          <Input
            color="white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            mb="2"
          />
          <Text color="white">Password</Text>
          <Input color="white" defaultValue={password} readOnly mb="2" />
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
          <Text color="white">Address</Text>
          <Input
            color="white"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            mb="2"
          />
          <Text color="white">Country</Text>
          <Input
            color="white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            mb="2"
          />
          <Text color="white">Ticket</Text>
          <Input
            color="white"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            mb="2"
          />
          <Text color="white">Date</Text>
          <Input color="white" defaultValue={date} mb="2" readOnly />
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

export default AdminInfoPage;
