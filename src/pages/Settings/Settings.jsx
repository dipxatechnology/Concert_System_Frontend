import { useState } from "react";
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
  Spacer,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import "./settings.css";

export default function Settings() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleClick = (passType) => {
    if (passType === "old") {
      setShowOldPass(!showOldPass);
    } else if (passType === "new") {
      setShowNewPass(!showNewPass);
    } else if (passType === "confirm") {
      setShowConfirmPass(!showConfirmPass);
    }
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
      <Box className="box">
        <Flex justifyContent="space-between" className="flex" w="60%">
          <Box className="internal-box">
            <Text fontSize="lg" fontWeight="600">
              Avatar
            </Text>
            <Divider margin="5px 0" />
            <Box className="box-diff-margin">
              <Avatar size="2xl" />
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
            <Stack>
              <Text
                marginTop="5px"
                color="grey"
                fontSize="small"
                fontWeight="600"
              >
                Username
              </Text>
              <Input
                background="#333333"
                border="none"
                size="lg"
                borderRadius="10px"
              />
            </Stack>
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
              />
            </Stack>
            <HStack>
              <Stack>
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
                  width="15vh"
                />
              </Stack>
              <Spacer />
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
                  width="28vh"
                />
              </Stack>
            </HStack>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
