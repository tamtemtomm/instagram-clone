// Import dependencies
import { useState } from "react";

// Import ChakraUI components
import {
  GridItem,
  Flex,
  Text,
  Image,
  Avatar,
  Divider,
  VStack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Import hooks
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";

// Import store
import usePostStore from "../../store/postStore";

// Import firebase dependencies
import { firestore, storage } from "../../firebase/firebase";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Import post components
import Comment from "../Common/Comment";
import Caption from "../Common/Caption";
import PostFooter from "../FeedPosts/PostFooter";


const ProfilePost = ({ post }) => {
  // Set the modal state from ChakraUI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get the current auth user
  const authUser = useAuthStore((state) => state.user);

  // Get the current targeted user
  const userProfile = useUserProfileStore((state) => state.userProfile);

  // Get the toast
  const showToast = useShowToast();

  // ---------------------------------------------------------------------
  // Initialize deletePost function
  // Set the delete loading state
  const [isDeleting, setIsDeleting] = useState(false);

  // Get the delete store hooks form global state
  const deletePost = usePostStore((state) => state.deletePost);

  // Get delete post from profile state hooks
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const handleDeletePost = async () => {
    // Check confirmation
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    // Check if it's already deleting to prevent clicking repeatedly
    if (isDeleting) return;

    // Set the loading state on
    setIsDeleting(true);

    try {
      // Get the imageRef in storage
      const imageRef = ref(storage, `posts/${post.id}`);

      // Delete image from storage
      await deleteObject(imageRef);

      // Delete in posts collection
      await deleteDoc(doc(firestore, "posts", post.id));

      // Get the user ref
      const userRef = doc(firestore, "users", authUser.uid);

      // Update posts field in user
      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      // Update the global post state
      deletePost(post.id);

      // Update the global user state
      decrementPostsCount(post.id);

      // Toast the succes
      showToast("Success", "Post deleted successfully", "success");

      // Toast the error
    } catch (err) {
      showToast("Error", err.message, "error");

      // Release the laoding state
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={"50px"}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.imageURL}
          alt="post img"
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
        ></Image>
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL}></Image>
              </Flex>

              <Flex
                flex={1}
                direction={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      name="Tamtemtom"
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      isLoading={isDeleting}
                      onClick={handleDeletePost}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* CAPTION */}
                  {post.caption && <Caption post={post}/>}


                  {/* COMMENTS */}
                  {post.comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                  ))}

                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter post={post} isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
