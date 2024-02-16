import { useEffect, useState } from "react";
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
  Textarea,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

import "./signup.css";
import api from "../../api/api";

export default function SignUp({ setLoggedIn }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    setUsername(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password === secondPassword) {
      try {
        const signUpData = {
          username,
          password,
          phone_number,
          address,
          postcode,
          country,
          email,
          roles: ["User"],
          profile: "https://picsum.photos/200",
        };

        await api.post("/createUser", signUpData);

        navigate("/login");
      } catch (error) {
        console.error("Error during user registration:", error);
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleClick = () => setShow(!show);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  return (
    <div>
      <Box className="signup-style">
        <form onSubmit={handleSignUp}>
          <VStack alignItems="flex-start" maxWidthwidth="30%">
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
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last name"
                background="#333333"
                border="none"
                marginTop="10px"
                size="lg"
                onChange={(e) => setLastName(e.target.value)}
              />
            </HStack>
            <Input
              placeholder="Contact"
              background="#333333"
              border="none"
              marginTop="5px"
              size="lg"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              placeholder="Email Address"
              background="#333333"
              border="none"
              marginTop="5px"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Textarea
              placeholder="Residency Address"
              background="#333333"
              border="none"
              marginTop="5px"
              size="lg"
              height="15vh"
              onChange={(e) => setAddress(e.target.value)}
            />
            <HStack>
              <Input
                placeholder="Postcode"
                background="#333333"
                border="none"
                marginTop="5px"
                size="lg"
                width="40%"
                onChange={(e) => setPostCode(e.target.value)}
              />
              <Input
                placeholder="Country"
                background="#333333"
                border="none"
                marginTop="5px"
                size="lg"
                width="60%"
                onChange={(e) => setCountry(e.target.value)}
              />
            </HStack>
            <InputGroup>
              <Input
                placeholder="Password"
                background="#333333"
                border="none"
                type={show ? "text" : "password"}
                size="lg"
                marginTop="5px"
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setSecondPassword(e.target.value)}
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
              type="submit"
              bg="brand.100"
              width="100%"
              marginTop="20px"
              _hover={{ bg: "brand.200" }}
              fontWeight="bold"
              onClick={() => handleSignUp()}
            >
              Create account
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
}
