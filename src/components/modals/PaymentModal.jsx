import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../../api/api";

function PaymentModal({ event, selectedQuantity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const currentDate = new Date().toISOString();
      const userObject = JSON.parse(localStorage.getItem("userData"));
      const userId = userObject?._id;
      const concertId = event._id;

      const ticketData = {
        status: "Completed",
        quantity: selectedQuantity,
        user: userId,
        concert: concertId,
        date: currentDate,
      };

      await api.post("/tickets", ticketData);

      toast({
        title: "Successfully Purchased.",
        description: "Thank you for purchasing from us.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });

      onClose();
    } catch (error) {
      console.error("An error occurred:", error.message);

      toast({
        title: "Error.",
        description: "An Error Occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        bg="brand.100"
        width="80%"
        marginTop="20px"
        _hover={{ bg: "brand.200" }}
        fontWeight="bold"
        isDisabled={event.seats <= 0}
        onClick={onOpen}
      >
        Proceed to Payment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Include your payment form here */}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePayment}
              isLoading={loading}
            >
              Pay
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PaymentModal;
