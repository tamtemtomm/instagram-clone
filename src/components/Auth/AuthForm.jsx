import { Box, VStack, Image, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image
            src="/logo.png"
            h={24}
            cursor={"pointer"}
            alt="Instagram logo"
          />

          {isLogin ? <Login /> : <Signup />}

          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            my={2}
            gap={1}
            w={"full"}
          >
            {/*--------- OR ---------------------- */}
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <GoogleAuth prefix={isLogin ? "Login" : "Signup"} />
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} p={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {!isLogin ? "Don't have an account?" : "Already have an account"}
          </Box>
          <Box
            onClick={() => setIsLogin(!isLogin)}
            fontSize={14}
            color={"blue.500"}
            cursor={"pointer"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {isLogin ? "Signup" : "Login"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
