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
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { RxAvatar } from "react-icons/rx";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo_dark.svg";
import "./layout.css";

import api from "../../api/api";
import Cookies from "js-cookie";

// Define the main component
export default function Navbar({ setLoggedIn, loggedIn, loading, setLoading }) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      // Make an API request to the backend logout endpoint
      await api.post("/auth/logout");

      // Remove the access token from cookies
      Cookies.remove("accessToken");

      // Remove the localstorage userdata
      localStorage.removeItem("userData");

      // Redirect or perform actions after successful logout
      navigate('/')

      toast({
        title: "Logged Out.",
        description: "Have a good day.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Logout failed:", error.message);

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

  const storedData = localStorage.getItem("userData");

  const storedObject = JSON.parse(storedData);

  return (
    <div style={{ padding: "15px 50px" }} className="background">
      <Flex alignItems="center">
        <Image src={logo} boxSize={"60px"} />
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
                  <Avatar size="md" src={`${storedObject.profile}`} />
                </MenuButton>
                <MenuList background="#333333">
                  <MenuItem background="#333333" color="white">
                    <Avatar
                      size="md"
                      className="avatar-container"
                      src={`${storedObject.profile}`}
                    />
                    {storedObject.username}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      setLoading(true);
                      navigate(`/profile/${storedObject._id}`);
                    }}
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
                    onClick={() => navigate("/events")}
                    _hover={{ background: "#D45161", color: "black" }}
                    background="#333333"
                    color="white"
                    icon={
                      <Box margin="5px 6px">
                        <CalendarIcon boxSize="20px" />
                      </Box>
                    }
                  >
                    Join Events
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
                    onClick={() => {
                      setLoggedIn(false);
                      handleLogout();
                      navigate("/");
                    }}
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
    label: "Contact",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];
