// Import depedencies
import { useState } from "react";

// Import hooks
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";

// Import firebase import
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const usePostComment = () => {
  // Set the loading state
  const [isCommenting, setIsCommenting] = useState(false);

  // Get the toast
  const showToast = useShowToast();

  // Get the auth user
  const authUser = useAuthStore((state) => state.user);

  // Get the addComment hooks
  const addComment = usePostStore((state) => state.addComment);

  // Make a function to hanlde comment
  const handlePostComment = async (postId, comment) => {
    // Check if it is already commenting, to prevent clicking repeteadly
    if (isCommenting) return;

    // Check if there is a authUser
    if (!authUser)
      return showToast("Error", "You need to login to comment", "error");

    try {
      // Set the loading state on
      setIsCommenting(true);

      // Make newComment object
      const newComment = {
        comment,
        createdAt: Date.now(),
        createdBy: authUser.uid,
        postId,
      };

      // Get the posts collection ref
      const postRef = doc(firestore, "posts", postId);

      // Update the post in postRef
      await updateDoc(postRef, { comments: arrayUnion(newComment) });

      // Update the posts global store
      addComment(postId, newComment);

      // Toast the error
    } catch (err) {
      showToast("Error", err.message, "error");

      // Release the loading state
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
