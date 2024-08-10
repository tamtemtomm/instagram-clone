import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useUserProfileStore from "../store/userProfileStore";

const useFollowUser = (userId) => {
  // Get the toast hooks
  const showToast = useShowToast();

  // Set the update and follow loading state
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Get the current auth user and it's setter
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);

  // Get the current user page profile and it's setter
  const { userProfile, setUserProfile } = useUserProfileStore();

  // Initialize the handle follow function
  const handleFollowUser = async () => {
    // Set the loading state to true
    setIsUpdating(true);

    try {
      // Get the current user ref
      const currentUserRef = doc(firestore, "users", authUser.uid);

      // Get the targeted user ref
      const targetedUser = doc(firestore, "users", userId);

      // UPDATE DATA IN DB
      //----------------------------------------------------------------
      // Update the current user following field
      await updateDoc(currentUserRef, {
        // Add the targeted uid if follow, remove if following
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      // Update the targeted user follower field
      await updateDoc(targetedUser, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });

      // UPDATE DATA IN GLOBAL ZUSTAND STATE
      //----------------------------------------------------------------
      if (isFollowing) {
        // Unfollow the user if following
        // Remove the targeted user uid from current user following array
        setAuthUser({
          ...authUser,
          // remove the one with targeted user uid
          following: authUser.following.filter((uid) => uid !== userId),
        });

        // Remove the current user uid from the targeted user follower array
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(
              (uid) => uid !== authUser.uid
            ),
          });
        }

        // Update the local storage
        localStorage.setItem(
          "user-info-instagram-clone",
          JSON.stringify({
            ...authUser,
            // remove the one with targeted user uid
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );

        // release the following state to false
        setIsFollowing(false);
      } else {
        // Follow the user if not
        // Add the targeted user id into current user following array
        setAuthUser({
          ...authUser,
          following: [...authUser.following, userId],
        });

        // Add the current user id into targeted user follower array
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid],
          });
        }

        // Update the local Storage
        localStorage.setItem(
          "user-info-instagram-clone",
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        // Set the following state to true
        setIsFollowing(true);
      }

      // Catch and toast the arror
    } catch (err) {
      showToast("Error", err.message, "error");

      // Release the laoding state
    } finally {
      setIsUpdating(false);
    }
  };

  // Check if the current user is already following the targeted user or not
  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
