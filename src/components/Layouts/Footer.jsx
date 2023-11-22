import {
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import './layout.css';

// Main component
function Footer() {
  return (
    <div className="background">
      <Flex padding={"15px 50px 30px"}>
        <Text color={"grey"} >
          Copyright © 2022 Vibe Fest. All rights reserved.
        </Text>
        <Spacer />
        <Flex >
          <Link >
            <Text color={"white"} paddingRight={"50px"}>
              Privacy Policy
            </Text>
          </Link>
          <Link >
            <Text color={"white"} >
              Terms of Use
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}

export default Footer;
