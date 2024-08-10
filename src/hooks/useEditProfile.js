// Import dependencies
import { useState } from "react";

// Import hooks and store
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";

// Import firebase dependencies
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";


const useEditProfile = () => {
  // Set the loading state
  const [isUpdating, setIsUpdating] = useState();

  // Set showtoast instance
  const showToast = useShowToast();

  // Get the auth user
  const authUser = useAuthStore((state) => state.user);

  // Get the auth user setter from zustand
  const setAuthUser = useAuthStore((state) => state.setUser);

  // Get the userProfile setter from zustand
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  // Initialize edit profile function
  const editProfile = async (inputs, selectedFile) => {
    // Check if its already updating, so the user cannot submit many times at the same times
    if (isUpdating || !authUser) return;

    // Set the loading state on
    setIsUpdating(true);

    // Get the storage ref
    const storageRef = ref(storage, `profilePics/${authUser.uid}`);

    // Get the db ref
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      // Check if the user input the img
      if (selectedFile) {
        // Upload the img to the storage
        await uploadString(storageRef, selectedFile, "data_url");

        // Get the URL back
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      // Set the new user data
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };
      // update the data in db
      await updateDoc(userDocRef, updatedUser);

      // Update the user data in localStorage
      localStorage.setItem(
        "user-info-instagram-clone",
        JSON.stringify(updatedUser)
      );

      // Update the auth user data
      setAuthUser(updatedUser);

      // Update the user profile data
      setUserProfile(updatedUser);

      // Show a success toast
      showToast("Success", "Profile updated successfully", "success");
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
