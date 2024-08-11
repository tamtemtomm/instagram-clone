import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
  // Set the loading state
  const [isLoading, setIsLoading] = useState(true);

  // Set the userProfile state
  const [userProfile, setUserProfile] = useState(null);

  // Get the toast
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      // Set the loading state on
      setIsLoading(true);

      // Set the laoding userProfile state null
      setUserProfile(null);
      try {
        // Get the user ref data
        const userRef = await getDoc(doc(firestore, "users", userId));

        // Check if the user ref exists
        if (userRef.exists()) {
          // Set the userProfile data
          setUserProfile(userRef.data());
        }

        // Toast the error
      } catch (error) {
        showToast("Error", error.message, "error");

        // Release the loading state
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
