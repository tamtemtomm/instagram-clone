// Import depencies
import { useState } from "react";

// Import signup with email and password hooks
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

// import ChakraUI components
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Signup = () => {

  // Set the state of the inputs
  const [inputs, setInputs] = useState({
    password: "",
    fullName: "",
    email: "",
    username: "",
  });

  // Set the show state of the password input
  const [showPassword, setShowPassword] = useState(false);

  // Get the sign up hooks instance
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  return (
    <>
      <Input
        placeholder="email"
        fontSize={"14"}
        type="email"
        value={inputs.email}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, email: e.target.value });
        }}
      />
      <Input
        placeholder="Username"
        fontSize={"14"}
        type="text"
        value={inputs.username}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, username: e.target.value });
        }}
      />
      <Input
        placeholder="Full Name"
        fontSize={"14"}
        type="text"
        value={inputs.fullName}
        size={"sm"}
        onChange={(e) => {
          setInputs({ ...inputs, fullName: e.target.value });
        }}
      />
      <InputGroup>
        <Input
          placeholder="password"
          fontSize={"14"}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size={"sm"}
          onChange={(e) => {
            setInputs({ ...inputs, password: e.target.value });
          }}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={"14"}
        onClick={() => {
          signup(inputs);
        }}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
