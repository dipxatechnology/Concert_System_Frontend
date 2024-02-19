import { Text, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./layout.css";

// Main component
function Footer() {
  return (
    <div className="background">
      <Flex padding={"15px 50px 30px"}>
        <Text color={"grey"}>
          Copyright © 2022 Vibe Fest. All rights reserved.
        </Text>
        <Spacer />
        <Flex>
          <Link to="/policy">
            <Text color={"white"} paddingRight={"50px"}>
              Privacy Policy
            </Text>
          </Link>
          <Link to="/terms">
            <Text color={"white"}>Terms of Use</Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}

export default Footer;
