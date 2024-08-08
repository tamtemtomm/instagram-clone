import { Flex, Avatar, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar name="Timo" size={"lg"} src="/profilepic.png" />
        <Box fontSize={12} fontWeight={"bold"}>
          Timo
        </Box>
      </Flex>
      <Link
        as={RouterLink}
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.500"}
        style={{ textDecoration: "none" }}
        cursor={"pointer"}
      >Log Out</Link>
    </Flex>
  );
};

export default SuggestedHeader;
