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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import api from "../../api/api";
import { AnimCursor } from "../AnimCursor";

const FeedbackModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/feedbacks", {
        username,
        email,
        message,
      });

      if (response.status === 201) {
        toast({
          title: "Feedback Submitted.",
          description: "Thank you for your feedback!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });

        // Reset form after successful submission
        setUsername("");
        setEmail("");
        setMessage("");

        onClose();
      } else {
        console.error("Error submitting feedback:", response.data);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="#222222" color="white">
        <AnimCursor />
        <ModalHeader fontWeight="bold">Submit Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb="4">
              <FormLabel>Username:</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Message:</FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt="4">
              Submit Feedback
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
