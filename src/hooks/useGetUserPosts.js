import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
  // Set the loading state
  const [isLoading, setIsLoading] = useState(true);

  // Set the posts state function from global state
  const {posts, setPosts} = usePostStore();

  // Get the toast
  const showToast = useShowToast();

  // Get the userProfile hooks
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      // Check if there is a user profile
      if (!userProfile) return;

      // Set the loading state on
      setIsLoading(true);

      // Set the posts into empy array
      setPosts([]);

      try {
        // Make a query to get the posts of the targeted user
        const q = query(
          collection(firestore, "posts"),
          where("createdBy", "==", userProfile.uid)
        );

        // Get the snap of query
        const querySnap = await getDocs(q);

        // Push all of the posts data into empty array
        let posts = [];
        querySnap.forEach((doc) => posts.push({ ...doc.data(), id: doc.id }));

        // Sort by the latest
        posts.sort((a, b) => b.createdAt - a.createdAt);

        // Update posts state
        setPosts(posts);

        // Toast the error
      } catch (err) {
        showToast("Error", err.message, "error");
        setPosts([]);

        // Release the loading state
      } finally {
        setIsLoading(false);
      }
    };

    // Call the initialized function
    getPosts()
  }, [setPosts, userProfile, showToast]);


  return {isLoading, posts}
};

export default useGetUserPosts;
