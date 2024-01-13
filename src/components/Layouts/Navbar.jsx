import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  Spacer,
  Image,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { GrDocumentTime } from "react-icons/gr";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

import "./layout.css";

// Define the main component
export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  return (
    <div style={{ padding: "15px 50px" }} className="background">
      <Flex alignItems="center">
        <Image src="src/assets/logo_dark.svg" boxSize={"60px"} />
        <Spacer />
        <DesktopNav />
        <Spacer />
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {loggedIn ? (
            // <Avatar size="md" />
            <>
              <Menu>
                <MenuButton>
                  <Avatar size="md" />
                </MenuButton>
                <MenuList background="#333333">
                  <MenuItem background="#333333" color="white">
                    <Avatar size="md" className="avatar-container" />
                    *User Name*
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => navigate("/profile")}
                    _hover={{ background: "#D45161", color: "black" }}
                    background="#333333"
                    color="white"
                    icon={
                      <Box margin="5px 4px">
                        <RxAvatar size="25px" />
                      </Box>
                    }
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/ticket-history")}
                    _hover={{ background: "#D45161", color: "black" }}
                    background="#333333"
                    color="white"
                    icon={
                      <Box margin="5px 6px">
                        <GrDocumentTime size="20px" />
                      </Box>
                    }
                  >
                    Ticket History
                  </MenuItem>
                  <MenuItem
                    onClick={() => navigate("/settings")}
                    _hover={{ background: "#D45161", color: "black" }}
                    background="#333333"
                    color="white"
                    icon={
                      <Box margin="5px 5px">
                        <IoSettingsOutline size="24px" />
                      </Box>
                    }
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    onClick={() => setLoggedIn(false)}
                    _hover={{ background: "#D45161", color: "black" }}
                    background="#333333"
                    color="white"
                    icon={
                      <Box margin="5px 5px">
                        <IoLogOutOutline size="25px" />
                      </Box>
                    }
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                bg={"#222222"}
                fontSize={"sm"}
                fontWeight={400}
                color={"white"}
                onClick={() => navigate("/signup")}
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
                onClick={() => navigate("/login")}
              >
                Log In
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Divider paddingTop={"15px"} />
    </div>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={10} textColor={"white"} fontSize={"lg"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link to={navItem.href} fontSize={"sm"} fontWeight={500}>
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
