import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./layout.css";

export default function MainLayout() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box flex="1" className="main-layout">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
