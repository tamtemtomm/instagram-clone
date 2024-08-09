import {
  Container,
  Box,
  VStack,
  Flex,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { useEffect, useState } from "react";

const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, idx) => (
          <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10}></SkeletonCircle>
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton h={"10px"} w={"200px"}></Skeleton>
                <Skeleton h={"10px"} w={"200px"}></Skeleton>
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>Contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          <FeedPost
            img="/img1.png"
            username="burakorkmezz"
            avatar="/img1.png"
          />
          <FeedPost img="/img2.png" username="josh" avatar="/img2.png" />
          <FeedPost img="/img3.png" username="jane doe" avatar="/img3.png" />
          <FeedPost img="/img4.png" username="john doe" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;