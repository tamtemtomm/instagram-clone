// Import dependencies
import { useState } from "react";

// Import hooks
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

// import firebase dependencies
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useLikePost = (post) => {
  // Set loading state
  const [isLiking, setIsLiking] = useState(false);

  // Get the current auth user
  const authUser = useAuthStore((state) => state.user);

  // Set the likes state, start from current likes
  const [likes, setLikes] = useState(post.likes.length);

  // Set the like or not initial state
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser.uid));

  // Get the toast
  const showToast = useShowToast();

  // Set the like post function
  const handleLikePost = async () => {
    // Check if it is already clicked to prevent clicking repeteadly
    if (isLiking) return;

    // Check if there is authUser
    if (!authUser)
      return showToast(
        "Error",
        "You must be logged in to like a post",
        "error"
      );

    try {
      // Set the loading state on
      setIsLiking(true);

      // Get the postRef
      const postRef = doc(firestore, "posts", post.id);

      // Update the doc
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      });

      // reverse the liked state
      setIsLiked(!isLiked);

      // Change the number of likes
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);

      // Toast the error
    } catch (err) {
      showToast("Error", err.message, "error");

      // Release the loading state
    } finally {
      setIsLiking(false);
    }
  };

  return { isLiked, likes, handleLikePost, isLiking };
};

export default useLikePost;
