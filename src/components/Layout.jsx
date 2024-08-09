import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

const Layout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
  const {pathname} = useLocation()
  const canRenderSidebar = pathname !== "/auth" && user
  // console.log(location.pathname)

  // console.log(window.location.pathname );
  return (
    <Flex>
      {canRenderSidebar ?  (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      <Box flex={1} w={{ base: "calc(100%-76px)", md: "calc(100%-240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
