// Import ChakraUI components
import { Flex, Grid, VStack, Skeleton, Box, Text} from "@chakra-ui/react";

// Import profile components
import ProfilePost from "./ProfilePost";

// Import get user posts hooks
import useGetUserPosts from "../../hooks/useGetUserPosts";

const ProfilePosts = () => {
  // Get the userPosts hooks
  const {isLoading, posts} = useGetUserPosts()
  // console.log(posts)

  // Check if there is no posts
  const noPostsFound = !isLoading && posts.length === 0
  if(noPostsFound) return <NoPostsFound/>

  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {" "}
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>Content wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id}/>
          ))}
        </>
      )}
    </Grid>
  );
};

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};

export default ProfilePosts;
