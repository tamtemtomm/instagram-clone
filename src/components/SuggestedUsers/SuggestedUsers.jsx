// Import the header and user components
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

// Import the ChakraUI components
import { VStack, Flex, Box, Text, Link } from "@chakra-ui/react";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See all
        </Text>
      </Flex>
      <SuggestedUser
        name="Dan Abrahamov"
        followers={193}
        avatar="https://bit.ly/dan-abramov"
      />
      <SuggestedUser
        name="Ryan Florence"
        followers={567}
        avatar="https://bit.ly/ryan-florence"
      />
      <SuggestedUser
        name="Christian Nwamb"
        followers={193}
        avatar="https://bit.ly/code-beast"
      />

      <Box fontSize={12} color={"'gray.500"} mt={5}>
        © 2023 Built By{" "}
        <Link
          href="https://github.com/tamtemtomm"
          target="_blank"
          color="blue.500"
          fontSize={14}
          style={{ textDecoration: "none" }}
        >
          Timo
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
