// Import Firebase Dependencies
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase";

// Import Hooks and Store
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

// Import ChakraUI Components
import { Flex, Image, Text } from "@chakra-ui/react";

// Import default followed account
import defaultFollowedAccount from "../../utils/defaultFollowedAccount";

const GoogleAuth = ({ prefix }) => {
  // Get authenticated user
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);

  // Get showToast Hooks
  const showToast = useShowToast();

  // get Login Function
  const loginUser = useAuthStore((state) => state.login);

  // Intialize funtion ro handle button clicked
  const handleGoogleAuth = async () => {
    try {
      // Sign In with google using firebase API
      const newUser = await signInWithGoogle();

      // Check if it is successful
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }

      // Check if user already has an account with the same cretendial in db
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      // if the sign in succes
      if (newUser) {
        // if the user already in db, login
        if (userSnap.exists()) {
          // Get the user data
          const userDoc = userSnap.data();

          // Save the credential in local storage
          localStorage.setItem(
            "user-info-instagram-clone",
            JSON.stringify(userDoc)
          );

          // Set the zustand global state
          loginUser(userDoc);

          //  if not sign up, save hthe credentials in db
        } else {
          const userDoc = {
            uid: newUser.user.uid,
            email: newUser.user.email,
            username: newUser.user.email.split("@")[0], // johndoe@gmail.com => johndoe
            fullName: newUser.user.displayName,
            bio: "",
            profilePicURL: newUser.user.photoURL,
            followers: [],
            following: [...defaultFollowedAccount],
            posts: [],
            createdAt: Date.now(),
          };
          // Save the userdoc into db
          await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

          // Update the automatically followed account
          defaultFollowedAccount.forEach(async (account) => {
            const accountRef = doc(firestore, "users", account);
            await updateDoc(accountRef, { followers: arrayUnion(newUser.user.uid) });
          });

          // Save the credentials into local storage
          localStorage.setItem(
            "user-info-instagram-clone",
            JSON.stringify(userDoc)
          );

          // Set the global state
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
