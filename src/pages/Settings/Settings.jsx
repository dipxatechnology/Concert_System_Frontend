import { useState, useEffect } from "react";
import {
  Breadcrumb,
  Textarea,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  Avatar,
  Divider,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  IconButton,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../../api/api";

import "./settings.css";
import { json, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Settings() {
  const navigate = useNavigate();
  const [newUserData, setUserData] = useState({});
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [profile, setProfile] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  useEffect(() => {
    setUsername(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const handleClick = (passType) => {
    if (passType === "old") {
      setShowOldPass(!showOldPass);
    } else if (passType === "new") {
      setShowNewPass(!showNewPass);
    } else if (passType === "confirm") {
      setShowConfirmPass(!showConfirmPass);
    }
  };

  useEffect(() => {
    let userData = localStorage.getItem("userData");
    userData = JSON.parse(userData);
    setUserData(userData);
    setCurrentUsername(userData.username);
    setProfile(userData.profile);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const id = newUserData._id;
    let updateData = {
      id,
      ...(username && { username }),
      ...(phone_number && { phone_number }),
      ...(address && { address }),
      ...(postcode && { postcode }),
      ...(country && { country }),
      ...(email && { email }),
    };

    try {
      // Only authenticate if the old password input is not empty
      if (oldPassword) {
        // Make an API request to authenticate the user with the old password
        const response = await api.post("/auth", {
          username: currentUsername,
          password: oldPassword,
        });

        // If the old password is incorrect, the API should return an error
        if (response.error) {
          console.error("Old password is incorrect.");
          return;
        }

        // Check if the new password and the confirmation password match
        if (password === secondPassword) {
          updateData = { ...updateData, password };
        } else {
          console.error("New passwords do not match.");
          return;
        }
      }

      console.log(updateData);
      await api.patch("/users", updateData);

      const signUpResponse = await api.post("/auth", {
        username: updateData.username,
        password: updateData.password,
      });

      const { accessToken, userData } = signUpResponse.data;

      // Check if the accessToken already exists in Cookies
      if (!Cookies.get("accessToken")) {
        Cookies.set("accessToken", accessToken, { expires: 1 });
      }

      // Check if the userData already exists in Local Storage
      if (!localStorage.getItem("userData")) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving new changes:", error);
    }
  };

  const handleDiscard = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setPostCode("");
    setCountry("");
    setOldPassword("");
    setPassword("");
    setSecondPassword("");
  };

  return (
    <div className="container">
      <Box className="box">
        <Breadcrumb w="60%" separator=">" fontSize="2xl" fontWeight="600">
          <BreadcrumbItem isCurrentPage color="grey">
            <BreadcrumbLink>User</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Edit profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <form onSubmit={handleSave}>
        <Box className="box">
          <Flex justifyContent="space-between" w="60%">
            <Box className="internal-box">
              <Text fontSize="lg" fontWeight="600">
                Avatar
              </Text>
              <Divider margin="5px 0" />
              <Box className="box-diff-margin">
                <Avatar size="2xl" src={profile} />
              </Box>
              <Text fontSize="lg" fontWeight="600" mt="10vh">
                Password
              </Text>
              <Divider margin="5px 0" />
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Old password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    border="none"
                    type={showOldPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showOldPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("old")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("old")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  New password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    border="none"
                    type={showNewPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showNewPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("new")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("new")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Confirm new password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    border="none"
                    type={showConfirmPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={secondPassword}
                    onChange={(e) => setSecondPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showConfirmPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("confirm")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("confirm")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <HStack mt="4vh">
                <Button
                  bg="brand.100"
                  width="20vh"
                  marginTop="20px"
                  _hover={{ bg: "brand.200" }}
                  fontWeight="600"
                  borderRadius="10px"
                  type="submit"
                >
                  Save changes
                </Button>
                <Button
                  color="grey"
                  borderColor="grey"
                  variant="outline"
                  width="15vh"
                  marginTop="20px"
                  _hover={{
                    bg: "Foreground",
                  }}
                  fontWeight="600"
                  borderRadius="10px"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
              </HStack>
            </Box>
            <Box className="internal-box">
              <Text fontSize="lg" fontWeight="600">
                User info
              </Text>
              <Divider margin="5px 0" />
              <HStack>
                <Stack>
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    First Name
                  </Text>
                  <Input
                    background="#333333"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    Last Name
                  </Text>
                  <Input
                    background="#333333"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Stack>
              </HStack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Contact
                </Text>
                <Input
                  background="#333333"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Stack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Email Address
                </Text>
                <Input
                  background="#333333"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Stack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Residency Address
                </Text>
                <Textarea
                  background="#333333"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  height="150px"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Stack>
              <HStack>
                <Stack width="40%">
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    Postcode
                  </Text>
                  <Input
                    background="#333333"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={postcode}
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    Country
                  </Text>
                  <Input
                    background="#333333"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Stack>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </form>
    </div>
  );
}
