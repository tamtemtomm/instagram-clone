// Import ChakraUI components
import { Flex, Box, Button, Avatar, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
  // Set the useFollow hook
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    user.uid
  );

  // Get the current auth user
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => (follower.uid !== authUser.uid))
        : [...user.followers, authUser],
    });
  };

  return (
    <>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        {" "}
        <Flex alignItems={"center"} gap={2}>
          <Avatar src={user.profilePicURL} name={name} size={"md"} />
          <VStack spacing={2} alignItems={"flex-start"}>
            {" "}
            <Box fontSize={12} fontWeight={"bold"}>
              {user.fullName}
            </Box>
            <Box fontSize={11} color={"gray.500"}>
              {user.followers.length} followers
            </Box>
          </VStack>
        </Flex>
        {/* Check if the current auth user is the same as targeted user */}
        {authUser.uid !== user.uid && (
          <Button
            fontSize={13}
            bg={"transparent"}
            p={0}
            h={"max-content"}
            fontWeight={"medium"}
            color={"blue.400"}
            cursor={"pointer"}
            _hover={{ color: "white" }}
            onClick={onFollowUser}
            isLoading={isUpdating}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Flex>
    </>
  );
};

export default SuggestedUser;
