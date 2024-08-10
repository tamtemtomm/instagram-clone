// Import dependencies
import { Link } from "react-router-dom";

// Import hooks and stores
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";

// Import ChakraIU Components
import { Flex, Avatar, Text, Button } from "@chakra-ui/react";

const SuggestedHeader = () => {
  // Initialize handle logout function from logout hooks
  const { handleLogout, isLoggingOut } = useLogout();

  // Get the auth user
  const authUser = useAuthStore((state) => state.user);

  // If there is none, return null
  if (!authUser) return null;

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar name="Timo" size={"md"} src={authUser.profilePicURL} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        size={"sx"}
        bg={"transparent"}
        _hover={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.500"}
        cursor={"pointer"}
        onClick={handleLogout}
        isLoading={isLoggingOut}
      >
        Log Out
      </Button>
    </Flex>
  );
};

export default SuggestedHeader;
