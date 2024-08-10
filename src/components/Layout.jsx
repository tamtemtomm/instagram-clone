import { Flex, Box, Spinner } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const checkUserIsAuth = !user && loading;
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
