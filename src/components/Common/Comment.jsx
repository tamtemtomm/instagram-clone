import { Flex, Avatar, Text } from "@chakra-ui/react";

const Comment = ({ username, createdAt, profilePic, text }) => {
  return (
    <Flex gap={4}>
      <Avatar src={profilePic} name={username} size={"sm"} />
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {username}
          </Text>
          <Text fontSize={14} color={"gray.500"}>
            {text}
          </Text>
        </Flex>
        <Text fontSize={14} color={"gray"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
