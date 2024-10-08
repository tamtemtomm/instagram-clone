// Import dependencies
import { useState } from "react";

// Import login hooks
import useLogin from "../../hooks/useLogin";

// Import ChakraUI components
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {

  // Set the inputs state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Set the show state of the password input
  const [showPassword, setShowPassword] = useState(false);

  // Get the login hooks instance
  const { login, loading, error } = useLogin();
  
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
      <InputGroup>
        <Input
          placeholder="password"
          fontSize={"14"}
          size={"sm"}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
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
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Login
      </Button>
    </>
  );
};

export default Login;
