import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./layout.css";

export default function MainLayout({ loggedIn, setLoggedIn, loading, setLoading }) {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} loading={loading} setLoading={setLoading}/>
      <Box flex="1" className="main-layout">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
