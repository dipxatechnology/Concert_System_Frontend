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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AnimCursor } from "../AnimCursor";

function PaymentModal({ event, selectedQuantity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return; // Stop the function if not all fields are filled
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      toast({
        title: "Error.",
        description: "Please enter a valid 16 digit card number.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      toast({
        title: "Error.",
        description: "Please enter a valid expiry date in the format MM/YY.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      toast({
        title: "Error.",
        description: "Please enter a valid 3 digit CVV.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (/\d/.test(cardHolderName)) {
      toast({
        title: "Error.",
        description: "Card holder name should not contain numbers.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

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
      navigate("/events");
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
        isDisabled={selectedQuantity <= 0}
        onClick={onOpen}
      >
        Proceed to Payment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#222222" color="white">
        <AnimCursor />
          <ModalHeader>Payment Method</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="cardNumber" isRequired>
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                pattern="\d{16}"
                title="Please enter a 16 digit card number"
              />
            </FormControl>
            <FormControl id="expiryDate" isRequired>
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                pattern="(0[1-9]|1[0-2])\/\d{2}"
                title="Please enter a date in the format MM/YY"
              />
            </FormControl>
            <FormControl id="cvv" isRequired>
              <FormLabel>CVV</FormLabel>
              <Input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                pattern="\d{3}"
                title="Please enter a 3 digit CVV"
              />
            </FormControl>
            <FormControl id="cardHolderName" isRequired>
              <FormLabel>Card Holder Name</FormLabel>
              <Input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handlePayment}
              isLoading={loading}
            >
              Pay
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PaymentModal;
