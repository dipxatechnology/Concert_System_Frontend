import { useState } from "react";
import {
  Text,
  Box,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import "./signup.css";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Box className="signup-style">
        <VStack alignItems="flex-start">
          <Text fontSize="5xl" as="b">
            Create an account
          </Text>
          <Text fontSize="lg" color="grey" marginTop="5px">
            Already have one?
            <Link to="/login">
              <Box as="span" color="#D45161" paddingLeft={"5px"}>
                Log in
              </Box>
            </Link>
            .
          </Text>
          <HStack>
            <Input
              placeholder="First name"
              background="#333333"
              border="none"
              marginTop="10px"
              size="lg"
            />
            <Input
              placeholder="Last name"
              background="#333333"
              border="none"
              marginTop="10px"
              size="lg"
            />
          </HStack>
          <Input
            placeholder="Email address"
            background="#333333"
            border="none"
            marginTop="5px"
            size="lg"
          />
          <InputGroup>
            <Input
              placeholder="Password"
              background="#333333"
              border="none"
              type={show ? "text" : "password"}
              size="lg"
              marginTop="5px"
            />
            <InputRightElement marginTop="8px">
              {show ? (
                <IconButton
                  icon={<ViewOffIcon color="white" />}
                  onClick={handleClick}
                  style={{ backgroundColor: "transparent" }}
                />
              ) : (
                <IconButton
                  icon={<ViewIcon color="white" />}
                  onClick={handleClick}
                  style={{ backgroundColor: "transparent" }}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <InputGroup>
            <Input
              placeholder="Confirm password"
              background="#333333"
              border="none"
              type={show ? "text" : "password"}
              size="lg"
              marginTop="5px"
            />
            <InputRightElement marginTop="8px">
              {showConfirm ? (
                <IconButton
                  icon={<ViewOffIcon color="white" />}
                  onClick={handleClickConfirm}
                  style={{ backgroundColor: "transparent" }}
                />
              ) : (
                <IconButton
                  icon={<ViewIcon color="white" />}
                  onClick={handleClickConfirm}
                  style={{ backgroundColor: "transparent" }}
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Checkbox size="lg" colorScheme="red" color="grey" marginTop="20px">
            I agree to the
            <Link to="/terms">
              <Box as="span" color="#D45161" paddingLeft={"5px"}>
                Terms of Use
              </Box>
            </Link>{" "}
            &
            <Link to="/policy">
              <Box as="span" color="#D45161" paddingLeft={"5px"}>
                Privacy Policy
              </Box>
            </Link>
          </Checkbox>
          <Button
            bg="brand.100"
            width="100%"
            marginTop="20px"
            _hover={{ bg: "brand.200" }}
            fontWeight="bold"
          >
            Create account
          </Button>
        </VStack>
      </Box>
    </div>
  );
}
