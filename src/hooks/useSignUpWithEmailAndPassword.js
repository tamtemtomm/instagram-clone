import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateDoc, arrayUnion } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import defaultFollowedAccount from "../utils/defaultFollowedAccount";

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const signup = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.fullName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("username", "==", inputs.username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        console.log(error.message);
        showToast("Error", error.message, "error");
        return;
      }

      if (newUser) {
        const userDocument = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [...defaultFollowedAccount],
          posts: [],
          createdAt: Date.now(),
        };

        // Add a new account in db
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument);

        // Update the automatically updated account
        defaultFollowedAccount.forEach(async (account) => {
          const accountRef = doc(firestore, "users", account);
          await updateDoc(accountRef, { followers: arrayUnion(account) });
        });

        localStorage.setItem(
          "user-info-instagram-clone",
          JSON.stringify(userDocument)
        );
        loginUser(userDocument);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { loading, error, signup };
};
export default useSignUpWithEmailAndPassword;
