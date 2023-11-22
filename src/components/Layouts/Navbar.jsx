// Import Chakra UI components and icons
import {
  Box,
  Flex,
  Button,
  Stack,
  Spacer,
  Image,
  Divider,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";

import "./layout.css";

// Define the main component
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div style={{padding: "15px 50px"}} className="background">
      <Flex alignItems='center'>
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
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"#222222"}
                borderColor={"white"}
                borderWidth={2}
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </Stack>
      </Flex>
      <Divider paddingTop={"15px"}/>
    </div>
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
