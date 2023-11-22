// Import Chakra UI components and icons
import {
  Box,
  Flex,
  Button,
  Stack,
  Spacer,
  Image,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import "./layout.css";

// Define the main component
export default function Navbar() {
  return (
    <Flex alignItems='center' padding={"10px 50px"} className="navbar" >
      <Image src="src/assets/logo_dark.svg" boxSize={"60px"}/>
      <Spacer />
      <DesktopNav />
      <Spacer />
      <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              bg={"#222222"}
              fontSize={"sm"}
              fontWeight={400}
              color={"white"}
            >
              Sign Up
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#222222"}
              borderColor={"white"}
              borderWidth={2}
            >
              Sign Up
            </Button>
          </Stack>
    </Flex>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={10} textColor={"white"} fontSize={"lg"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            to={navItem.href}
            fontSize={"sm"}
            fontWeight={500}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

// Interface for navigation items
const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];
