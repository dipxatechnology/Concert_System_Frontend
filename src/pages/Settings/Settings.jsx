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
} from "@chakra-ui/react";

import "./settings.css";

export default function Settings() {
  return (
    <div className="container">
      <Box className="box">
        <Breadcrumb w="70%" separator=">" fontSize="2xl" fontWeight="600">
          <BreadcrumbItem isCurrentPage color="grey">
            <BreadcrumbLink>User</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Edit profile</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box className="box">
        <Flex justifyContent="space-between" className="flex" w="70%">
          <Box className="internal-box">
            <Text fontSize="lg" fontWeight="600">
              Avatar
            </Text>
            <Divider margin="5px 0" />
            <Box className="box-diff-margin">
              <Avatar size="2xl" />
            </Box>
          </Box>
          <Box className="internal-box">Section 2</Box>
        </Flex>
      </Box>
    </div>
  );
}
