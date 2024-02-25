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

const UserModal = ({ isOpen, onClose }) => {
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const signUpData = {
          username,
          password,
          phone_number,
          address,
          postcode,
          country,
          email,
          roles,
          profile,
        };

        await api.post("/createUser", signUpData);

        toast({
          title: "Successful.",
          description: "Account created Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });

        onClose();
      } catch (error) {
        console.error("Error during user registration:", error);

        toast({
          title: "Error.",
          description: `An Error Occured : ${error}.`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="#222222" color="white">
        <AnimCursor />
        <ModalHeader fontWeight="bold">Create New User</ModalHeader>
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
              <FormLabel>Password:</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button bg="#2222222" color="white" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email:</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} required />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Phone Number:</FormLabel>
              <Input
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Roles:</FormLabel>
              <Select placeholder="select one" onChange={(e) => setRoles([e.target.value])} required>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Select>
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
              <FormLabel>Address:</FormLabel>
              <Input onChange={(e) => setAddress(e.target.value)} required />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Postcode:</FormLabel>
              <Input onChange={(e) => setPostCode(e.target.value)} required />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Country:</FormLabel>
              <Input onChange={(e) => setCountry(e.target.value)} required />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt="4">
              Create User
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
