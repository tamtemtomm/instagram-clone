import { Flex, Box } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";
import { useLocation } from "react-router-dom";
const Layout = ({ children }) => {
  const { pathName } = useLocation;
  return (
    <Flex>
      {pathName !== "/auth" && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Navbar />
        </Box>
      )}

      <Box flex={1} w={{ base: "calc(100%-76px)", md: "calc(100%-240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
