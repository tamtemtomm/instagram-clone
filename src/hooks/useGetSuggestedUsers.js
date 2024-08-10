// Import dependencies
import { useEffect, useState } from "react";

// Import hooks and store
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

// Import firebase dependencies
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  // Set the loading state
  const [isLoading, setIsLoading] = useState(false);

  // Set the suggested users state
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Get the current auth user
  const authUser = useAuthStore((state) => state.user);

  // Get the toast
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      // Set the loading state on
      setIsLoading(true);

      try {
        // Set the users collection ref
        const usersRef = collection(firestore, "users");

        // Set the query, don't include current auth user and the user that already followed
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        // get the querySnap
        const querySnap = await getDocs(q);

        // Push all the doc data into array
        let users = [];
        querySnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        // Set the suggested users
        setSuggestedUsers(users);

        // Show toast for errore
      } catch (err) {
        showToast("Error", err.message, "error");

        // Release the loading state
      } finally {
        setIsLoading(false);
      }
    };

    // Check if there is auth user
    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  // return the loading state and suggested users state
  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
