// Import dependencies
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";

// Import hooks and store
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";

// Import firebase dependencies
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// Import ChakraUI components
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

// Import the icons
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";

const CreatePost = () => {
  // Set the modal hooks from ChakraUI
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Set the caption inputs state
  const [caption, setCaption] = useState("");

  // Set the image ref
  const imageRef = useRef(null);

  // Set the preview img hooks
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();

  // Set the createpost hooks
  const { isLoading, handleCreatePost } = useCreatePost();

  // Set the toast hook
  const showToast = useShowToast();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);

      // Close the modal once the post saved
      onClose();

      // Set the states back to its origin
      setCaption("");
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={"Create"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              placeholder="Post caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <Input
              type="file"
              hidden
              ref={imageRef}
              onChange={handleImageChange}
            />

            <BsFillImageFill
              onClick={() => imageRef.current.click()}
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              size={16}
            />
            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;

function useCreatePost() {
  // Get a toast
  const showToast = useShowToast();

  // Set the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Get the current auth user
  const authUser = useAuthStore((state) => state.user);

  // Set the createPost global state from zustand
  const createPost = usePostStore((state) => state.createPost);

  // Set the addPost store from global state
  const addPost = useUserProfileStore((state) => state.addPost);

  const userProfile = useUserProfileStore((state) => state.userProfile);

  // Get the current pathName
  const { pathname } = useLocation();

  // initialize handleCreatePost that take an img and caption
  const handleCreatePost = async (selectedFile, caption) => {
    // Check if it's already clicked and in loading state
    if (isLoading) return;

    // Check if there is an img
    if (!selectedFile) throw new Error("Please select an image");

    // Set loading state on
    setIsLoading(true);

    // Create a new posts
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      // Get the posts collection ref
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // Get the users collection ref
      const userDocRef = doc(firestore, "users", authUser.uid);
      //Get the storage ref, set the path according to postId
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      // Save the post into posts collection
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      // Save the img into selected path
      await uploadString(imageRef, selectedFile, "data_url");

      // Get the image URL
      const downloadURL = await getDownloadURL(imageRef);

      // Save the image URL into posts collection
      await updateDoc(postDocRef, { imageURL: downloadURL });

      // Update the newPost object
      newPost.imageURL = downloadURL;

      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });

      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });

      showToast("Success", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}
