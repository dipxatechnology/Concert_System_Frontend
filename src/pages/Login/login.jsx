import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/api";

import {
  Text,
  Box,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import "./login.css";

export default function Login({ setLoggedIn, loggedIn }) {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      const loginData = {
        username,
        password,
      };
      console.log(loginData);

      // Make an API request to authenticate the user and obtain a token
      const response = await api.post("/auth", loginData);

      // Extract the token and user data from the response
      const { accessToken, userData } = response.data;

      // Store the token and user data in a secure manner (e.g., in cookies or local storage)
      Cookies.set("accessToken", accessToken, { expires: 1 });
      localStorage.setItem("userData", JSON.stringify(userData));

      // Set the setLoggedIn to true
      setLoggedIn(true);

      // Redirect or perform actions after successful login
      navigate("/");

      toast({
        title: "Logged In.",
        description: "Welcome back.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Login failed:", error.message);
      toast({
        title: "Error.",
        description: "An Error Occured.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Box className="login-style">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <VStack alignItems="flex-start">
            <Text fontSize="5xl" as="b">
              Welcome back!
            </Text>
            <Text fontSize="lg" color="grey" marginTop="5px">
              Don't have an account?
              <Link to="/signup">
                <Box as="span" color="#D45161" paddingLeft={"5px"}>
                  Sign up
                </Box>
              </Link>
              .
            </Text>
            <Input
              placeholder="Username"
              background="#333333"
              border="none"
              marginTop="40px"
              size="lg"
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputGroup>
              <Input
                placeholder="Password"
                background="#333333"
                border="none"
                type={show ? "text" : "password"}
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
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
            <Checkbox size="lg" colorScheme="red" color="grey" marginTop="20px">
              Remember me
            </Checkbox>
            <Button
              type="submit"
              bg="brand.100"
              width="100%"
              marginTop="20px"
              _hover={{ bg: "brand.200" }}
              fontWeight="bold"
            >
              Log in
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
}
