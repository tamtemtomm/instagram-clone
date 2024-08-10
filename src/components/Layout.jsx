// Import dependencies
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

// Import the ChakraUI comoonents
import { Flex, Box, Spinner } from "@chakra-ui/react";

// Get the sidebar and navbar components
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  // Get the auth user
  const [user, loading] = useAuthState(auth);
  // Set the laoding state
  const checkUserIsAuth = !user && loading;

  // Get the current pathname
  const { pathname } = useLocation();

  // If the user not in auth page, render the sidebar
  const canRenderSidebar = pathname !== "/auth" && user;
  
  // If the user not in auth page, has an auht user and not loading, render the navbar 
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  // If the page loading, render layout spinner
  if (checkUserIsAuth) return <LayoutSpinner />;

  return (
    <Flex direction={canRenderNavbar ? "column" : "row"}>
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}
      {canRenderNavbar ? <Navbar /> : null}
      <Box
        flex={1}
        w={{ base: "calc(100%-76px)", md: "calc(100%-240px)" }}
        mx={"auto"}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;

const LayoutSpinner = () => {
  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};
