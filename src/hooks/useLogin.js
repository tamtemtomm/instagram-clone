import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";

const useLogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginUser = useAuthStore((state) => state.login);

  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem(
          "user-info-instagram-clone",
          JSON.stringify(docSnap.data())
        );
        loginUser(docSnap.data());
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return { login, loading, error };
};

export default useLogin;
