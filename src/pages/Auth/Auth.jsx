import { Flex, Container, VStack } from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";
import AuthForm from "../../components/Auth/AuthForm";

const Auth = () => {
  return (
    <Flex
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      px={"4"}
    >
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            
          {/* Left side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={"650"} alt="Phone img" />
          </Box>

          {/* Right side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={10} alt="Playstore Img" />
              <Image src="/microsoft.png" h={10} alt="Microsoft Img" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Auth;
