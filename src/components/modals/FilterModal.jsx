import React, { useState } from "react";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Button,
} from "@chakra-ui/react";
import { RiFilter2Fill } from "react-icons/ri";
import { AnimCursor } from "../AnimCursor";

function FilterModal({ allEvents, setFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleGenreChange = (event) =>
    setFilter((f) => ({ ...f, genre: event.target.value }));

  const handleOrderChange = (event) =>
    setFilter((f) => ({ ...f, order: event.target.value }));

  const clearFilters = () => {
    setFilter({ genre: "", order: "" });
  };

  const genres = [
    ...new Set(allEvents.flatMap((event) => event.concert.genre)),
  ];

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <>
      <IconButton
        bg="brand.100"
        _hover={{ bg: "brand.200" }}
        fontWeight="bold"
        padding="8px"
        size="md"
        borderRadius="10px"
        onClick={handleOpen}
      >
        <RiFilter2Fill size="lg" />
      </IconButton>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <AnimCursor />
          <ModalHeader>Filter Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select genre"
              onChange={handleGenreChange}
              disabled={genres.length === 0}
              mb="10px"
              borderColor="black"
            >
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {toTitleCase(genre)}
                </option>
              ))}
            </Select>
            <Select
              borderColor="black"
              placeholder="Select order"
              onChange={handleOrderChange}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleClose}>
              Apply Filters
            </Button>
            <Button colorScheme="red" onClick={clearFilters}>
              Clear filters
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default FilterModal;
