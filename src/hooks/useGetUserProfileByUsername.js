// Import dependencies
import { useState, useEffect } from "react";

// Import firebase dependencies
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Import showtoast to show warning if there is an error
import useShowToast from "./useShowToast";

// Import userprofile glpbal state hooks
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfileByUsername = (username) => {
  // Initialized showToast hooks instance
  const showToast = useShowToast();

  // Initialize loading state
  const [isLoading, setIsLoading] = useState(true);

  // Initialize userProfile setter from zustand
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        // Initialize the query when the username is the same as params in the page URL
        const q = query(collection(firestore, "users"),where("username", "==", username));

        // Get the querys snapshot
        const querySnap = await getDocs(q);

        // Check if the snap empty
        if (querySnap.empty) return setUserProfile(null);

        // If not get the useDoc
        let userDoc;
        querySnap.forEach((doc) => {
          userDoc = doc.data();
        });

        // Set the glocal state userDoc using zustand setter
        setUserProfile(userDoc);

        // Show the error using toast 
      } catch (err) {
        showToast("Error", err.message, "error");

        // Release the laoding state
      } finally {
        setIsLoading(false);
      }
    };
    

    // Run the initialized funtion
    getUserProfile();
  }, [setUserProfile, username, showToast]);

  // Return the userProfile data loading state
  return { userProfile, isLoading };
};

export default useGetUserProfileByUsername;
