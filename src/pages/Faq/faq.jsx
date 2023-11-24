import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  Text,
  Container,
  Box,
  Heading,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import accordionItems from "./FaqData";

function Faq() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <VStack spacing={10} align="stretch">
        <div>
          <Heading color="white" textAlign={"center"}>
            Frequently Asked Questions{" "}
          </Heading>
          <Text fontSize="sm" color="Secondary" pt="10px">
            Got another question for us?{" "}
            <Text as={"span"} color={"red.400"}>
              {" "}
              Contact us
            </Text>{" "}
            via email!
          </Text>
        </div>
        <Container>
          <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
            {accordionItems.map((item, index) => (
              <AccordionItem key={index} py={"5px"}>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton
                        _expanded={{ bg: "Foreground", color: "Borders" }}
                      >
                        <Box as="span" flex="1" textAlign="left" color="white">
                          <Text fontSize="md" color="white">
                            {item.question}
                          </Text>
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize="12px" color="white" />
                        ) : (
                          <AddIcon fontSize="12px" color="white" />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Text color="Secondary">{item.answer}</Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </VStack>
    </Flex>
  );
}

export default Faq;
