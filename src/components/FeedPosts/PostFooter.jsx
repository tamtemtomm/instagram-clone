// Import dependencies
import { useRef, useState } from "react";

// Import ChakraUI components
import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

// Import logos from constants
import {
  NotificationsLogo,
  UnlikeLogo,
  CommentLogo,
} from "../../assets/constants";

// Import hooks and store
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";

const PostFooter = ({ post, username, isProfilePage }) => {
  // Get auth user
  const authUser = useAuthStore((state) => state.user);

  // Set comment
  const [comment, setComment] = useState("");

  // Set comment ref
  const commentRef = useRef(null)

  // Set the post comment hooks
  const { isCommenting, handlePostComment } = usePostComment();

  // Initialize submit comment function
  const handleSubmitComment = async () => {
    // Use the post comment hooks
    await handlePostComment(post.id, comment);

    // Set the comment into its origin state
    setComment("");
  };

  const { isLiked, likes, handleLikePost} = useLikePost(post)


  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={()=> commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"small"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontSize={"small"} fontWeight={700} display={"flex"} gap={2}>
            {username}
            <Text as={"span"} fontWeight={400}>
              Feeling Good
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"}>
            View all 1.000 comments
          </Text>
        </>
      )}

      {/* USER ONLY COMMENT IF AUTHENTICATED */}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                isLoading={isCommenting}
                onClick={handleSubmitComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
