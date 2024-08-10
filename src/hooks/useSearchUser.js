// Import dependencies
import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  // Set the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Set the user state
  const [user, setUser] = useState(null);

  // Get the toast hooks
  const showToast = useShowToast();

  // Initialize the getUserProfile function
  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      // Set the query
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      // Get the query snap
      const querySnap = await getDocs(q);

      // Check if the user found
      if (querySnap.empty) {
        return showToast("Error", "User not found", "error");
      }

      // Set the user into data from querySnap
      querySnap.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      showToast("Error", err.message, "error");
      setUser(null);
    } finally {
      // release the loading state
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
