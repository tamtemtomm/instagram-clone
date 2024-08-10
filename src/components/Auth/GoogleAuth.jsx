import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (newUser) {
        //Login
        if (userSnap.exists()) {
          const userDoc = userSnap.data();
          localStorage.setItem(
            "user-info-instagram-clone",
            JSON.stringify(userDoc)
          );
          loginUser(userDoc);

          // Signup
        } else {
          const userDoc = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            username: newUser.user.email.split("@")[0],
            fullName: newUser.user.displayName,
            bio: "",
            profilePicURL: newUser.user.photoURL,
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
          };
          await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
          localStorage.setItem(
            "user-info-instagram-clone",
            JSON.stringify(userDoc)
          );
          loginUser(userDoc);
        }
      }
    } catch (err) {
      showToast("Error", err.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={5} alt="Google logo" />
      <Text mx={2} color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default GoogleAuth;
